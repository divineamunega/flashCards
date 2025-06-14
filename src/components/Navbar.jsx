import { Moon } from "lucide-react";
import Button from "./Button";
import { Home } from "lucide-react";
import { Target } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { Link } from "lucide-react";
const Navbar = function ({ type = "primary" }) {
    return (
        <nav className="flex items-center justify-between w-full  px-4 py-6">
            <Link
                to="/"
                className="bg-gradient-to-r from-[#52357B] to-[#5459AC] text-transparent bg-clip-text text-2xl font-bold"
            >
                Study AI
            </Link>

            {type === "secondary" && (
                <div className="flex gap-10">
                    <Button type="link" to="/dashboard">
                        <Home className="w-3.5" />
                        Dashboard
                    </Button>
                    <Button type="link">
                        <Target className="w-[15px]" />
                        Tasks
                    </Button>
                    <Button type="link">
                        <BarChart3 className="w-4" />
                        Stats
                    </Button>
                </div>
            )}
            <div className="flex items-center gap-5">
                <button>
                    <Moon />
                </button>

                {type === "primary" && (
                    <Button type="link" to="/auth">
                        Login
                    </Button>
                )}

                {type === "secondary" && (
                    <button className="w-10 h-10 bg-gradient-to-r from-[#52357B] to-[#5459AC] text-white text-lg cursor-pointer    flex  rounded-full items-center justify-center ">
                        D
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
