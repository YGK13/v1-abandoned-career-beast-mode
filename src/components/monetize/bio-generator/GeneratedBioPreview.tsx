
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { RefreshCw, Copy, Save } from "lucide-react";
import { useBioGenerator } from "../BioGeneratorContext";

const GeneratedBioPreview: React.FC = () => {
  const { generatedBio, isGenerating, copyToClipboard, regenerateBio, saveBio } = useBioGenerator();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Generated Bio</CardTitle>
        <CardDescription>
          Your professional bio preview
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {generatedBio ? (
          <div className="bg-muted/30 p-4 rounded-md h-full">
            <p className="whitespace-pre-wrap">{generatedBio}</p>
          </div>
        ) : (
          <div className="bg-muted/30 p-4 rounded-md h-full flex items-center justify-center text-muted-foreground">
            <p>Fill in the form and generate your professional bio</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={regenerateBio}
          disabled={!generatedBio || isGenerating}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={copyToClipboard}
          disabled={!generatedBio}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button 
          size="sm" 
          onClick={saveBio}
          disabled={!generatedBio}
        >
          <Save className="h-4 w-4 mr-2" />
          Save to Assets
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneratedBioPreview;
