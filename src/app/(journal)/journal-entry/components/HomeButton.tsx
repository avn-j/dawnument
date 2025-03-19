import { Button } from "@/components/ui/button";
import { IconHomeFilled } from "@tabler/icons-react";
import Link from "next/link";

interface HomeButtonProps {
    isSaving: boolean;
}

export default function HomeButton({ isSaving }: HomeButtonProps) {
    return (
        <div>
            {isSaving ? (
                <Button disabled>
                    <IconHomeFilled />
                    Back to home
                </Button>
            ) : (
                <Button asChild>
                    <Link href="/">
                        <IconHomeFilled />
                        Back to home
                    </Link>
                </Button>
            )}
        </div>
    );
}
