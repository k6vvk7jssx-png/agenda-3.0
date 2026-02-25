import { UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <header className="sticky top-0 z-10 flex h-20 w-full items-center justify-between bg-background/50 px-6 backdrop-blur-xl">
            <div className="flex flex-1 items-center justify-between">
                <div className="font-semibold text-lg tracking-tight ml-16 sm:ml-0">
                    Good Morning
                </div>
                <div className="flex items-center gap-4">
                    <UserButton afterSignOutUrl="/" appearance={{
                        elements: {
                            avatarBox: "w-10 h-10 rounded-xl"
                        }
                    }} />
                </div>
            </div>
        </header>
    );
}
