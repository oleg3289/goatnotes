"use client";

import { createNoteAction } from "@/actions/notes";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";

type Props = {
  user: User | null;
};

const NewNoteButton = ({ user }: Props) => {
  const router = useRouter();

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);

      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);

      toast({
        title: "New note created",
        description: "You have created a new note.",
        variant: "success",
      });

      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant={"secondary"}
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
};
export default NewNoteButton;
