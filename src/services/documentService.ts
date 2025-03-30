
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

// Interfaces for document data
export interface Document {
  id: string;
  title: string;
  description: string | null;
  doc_type: string | null;
  file_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentUpload {
  title: string;
  description?: string;
  doc_type: string;
  file: File;
}

const STORAGE_BUCKET = "documents";

// Upload document to storage and save metadata in the database
export const uploadDocument = async (documentData: DocumentUpload): Promise<{ data: Document | null; error: Error | null }> => {
  try {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return { data: null, error: new Error("User not authenticated") };
    }
    
    const file = documentData.file;
    const fileExt = file.name.split('.').pop();
    const filePath = `${uuidv4()}.${fileExt}`;
    const fullPath = `${documentData.doc_type}/${filePath}`;
    
    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fullPath, file);
      
    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return { data: null, error: uploadError };
    }
    
    // Save document metadata in the database
    const { data, error: insertError } = await supabase
      .from("documents")
      .insert({
        title: documentData.title,
        description: documentData.description || null,
        doc_type: documentData.doc_type,
        file_path: fullPath,
        user_id: user.data.user.id // Add the user ID here
      })
      .select()
      .single();
      
    if (insertError) {
      console.error("Error saving document metadata:", insertError);
      return { data: null, error: insertError };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in uploadDocument:", error);
    return { data: null, error: error as Error };
  }
};

// Get all documents for the current user
export const getUserDocuments = async (): Promise<{ data: Document[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) {
      console.error("Error fetching documents:", error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getUserDocuments:", error);
    return { data: null, error: error as Error };
  }
};

// Get document by ID
export const getDocumentById = async (id: string): Promise<{ data: Document | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();
      
    if (error) {
      console.error("Error fetching document:", error);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error("Unexpected error in getDocumentById:", error);
    return { data: null, error: error as Error };
  }
};

// Delete document and its file
export const deleteDocument = async (id: string): Promise<{ success: boolean; error: Error | null }> => {
  try {
    // First get the document to get the file path
    const { data: document, error: fetchError } = await getDocumentById(id);
    
    if (fetchError || !document) {
      return { success: false, error: fetchError || new Error("Document not found") };
    }
    
    // Delete the file from storage if it exists
    if (document.file_path) {
      const { error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([document.file_path]);
        
      if (storageError) {
        console.error("Error deleting file:", storageError);
        // Continue with deleting the record even if file deletion fails
      }
    }
    
    // Delete the document record
    const { error: deleteError } = await supabase
      .from("documents")
      .delete()
      .eq("id", id);
      
    if (deleteError) {
      console.error("Error deleting document record:", deleteError);
      return { success: false, error: deleteError };
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error("Unexpected error in deleteDocument:", error);
    return { success: false, error: error as Error };
  }
};

// Get a signed URL for a document file
export const getDocumentFileUrl = async (filePath: string): Promise<{ url: string | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filePath, 60 * 60); // 1 hour expiry
      
    if (error) {
      console.error("Error getting signed URL:", error);
      return { url: null, error };
    }
    
    return { url: data.signedUrl, error: null };
  } catch (error) {
    console.error("Unexpected error in getDocumentFileUrl:", error);
    return { url: null, error: error as Error };
  }
};
