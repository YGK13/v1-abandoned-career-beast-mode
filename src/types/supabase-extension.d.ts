
// This is a temporary type extension for the Supabase client
// It will be removed once the database types are properly regenerated

import { Database } from '@/integrations/supabase/types';

declare module '@supabase/supabase-js' {
  interface Database extends Database {
    public: {
      Tables: {
        user_google_profiles: {
          Row: {
            id: string;
            user_id: string;
            google_id: string;
            full_name: string | null;
            email: string | null;
            profile_url: string | null;
            data: any | null;
            access_token: string | null;
            refresh_token: string | null;
            created_at: string;
            updated_at: string;
          };
          Insert: {
            id?: string;
            user_id: string;
            google_id: string;
            full_name?: string | null;
            email?: string | null;
            profile_url?: string | null;
            data?: any | null;
            access_token?: string | null;
            refresh_token?: string | null;
            created_at?: string;
            updated_at?: string;
          };
          Update: {
            id?: string;
            user_id?: string;
            google_id?: string;
            full_name?: string | null;
            email?: string | null;
            profile_url?: string | null;
            data?: any | null;
            access_token?: string | null;
            refresh_token?: string | null;
            created_at?: string;
            updated_at?: string;
          };
          Relationships: [
            {
              foreignKeyName: "user_google_profiles_user_id_fkey";
              columns: ["user_id"];
              referencedRelation: "users";
              referencedColumns: ["id"];
            }
          ];
        };
      };
    };
  }
}
