import Link from "next/link";
import { CalendarDays, LayoutDashboard, LineChart, Target } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-20 flex w-20 flex-col items-center justify-between border-r bg-background/50 py-8 backdrop-blur-xl transition-all sm:w-64 sm:items-start sm:px-6">
            <div className="flex w-full flex-col gap-y-10">
                <Link href="/" className="flex items-center justify-center p-2 sm:justify-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <Target className="h-6 w-6" />
                    </div>
                    <span className="hidden pr-4 pl-3 text-lg font-semibold tracking-tight sm:block">
                        Agenda 3.0
                    </span>
                </Link>

                <nav className="flex w-full flex-col items-center gap-y-4 sm:items-start">
                    <NavItem href="/" icon={<LayoutDashboard />} label="Dashboard" />
                    <NavItem href="/calendar" icon={<CalendarDays />} label="Calendar" />
                    <NavItem href="/finances" icon={<LineChart />} label="Finances" />
                </nav>
            </div>
        </aside>
    );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="group flex w-full items-center justify-center rounded-xl p-3 text-muted-foreground transition-all hover:bg-muted hover:text-foreground sm:justify-start"
            title={label}
        >
            <div className="flex h-6 w-6 items-center justify-center group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <span className="hidden px-4 font-medium sm:block">{label}</span>
        </Link>
    );
}
