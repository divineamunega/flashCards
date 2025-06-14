import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { TimerIcon, Trash, Trophy } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Calendar } from "lucide-react";
import { Plus } from "lucide-react";
import { Upload } from "lucide-react";
import { Target } from "lucide-react";
import { Link } from "react-router";
import { File } from "lucide-react";
import Decks from "../components/dashboard/Decks";

const Dashboard = ({ user, userIsLoading }) => {
    console.log(userIsLoading);
    const navigate = useNavigate();
    console.log(user);

    const navigateAway = function () {
        navigate("/");
        toast.error("login to access this page");
    };

    if (userIsLoading) {
        return <div>Loading</div>;
    }

    if (!user.name) {
        navigateAway();
    }

    return (
        <div className=" bg-gradient-to-r from-[#52357b1e] to-[#5458ac00]">
            <Navbar type="secondary" />

            <div className="max-w-[90vw] mx-auto flex items-center flex-col justify-center gap-10">
                <div className="flex flex-col sm:flex-row justify-between   w-full items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome {user.name?.split(" ")[0].toUpperCase()}👋🏾
                        </h1>
                        <p className="text-gray-800">
                            Ready to continue your learning journey?
                        </p>
                    </div>
                </div>

                <div className="flex gap-8 w-full ">
                    <div className="basis-1/4 rounded-[7px] h-fit shadow-md px-3 py-4 bg-white flex  items-center gap-8 ">
                        <div className="bg-blue-700 text-center px-2 py-2 rounded-[5px] my-auto">
                            <BookOpen className="text-white" />
                        </div>
                        <div className="flex  flex-col">
                            <span className="font-bold text-3xl">0</span>
                            <span>Decks</span>
                        </div>
                    </div>
                    <div className="basis-1/4 rounded-[7px] h-fit shadow-md px-3 py-4 bg-white flex  items-center gap-8 ">
                        <div className="bg-pink-700 text-center px-2 py-2 rounded-[5px] my-auto">
                            <Calendar className="text-white" />
                        </div>
                        <div className="flex  flex-col">
                            <span className="font-bold text-3xl">0</span>
                            <span>Day Streak</span>
                        </div>
                    </div>
                    <div className="basis-1/4 rounded-[7px] h-fit shadow-md px-3 py-4 bg-white flex  items-center gap-8 ">
                        <div className="bg-green-700 text-center px-2 py-2 rounded-[5px] my-auto text-white font-bold">
                            <p>XP</p>
                        </div>
                        <div className="flex  flex-col">
                            <span className="font-bold text-3xl">0</span>
                            <span>Experience</span>
                        </div>
                    </div>

                    <div className="basis-1/4 rounded-[7px] h-fit shadow-md px-3 py-4 bg-white flex  items-center gap-8 ">
                        <div className="bg-yellow-300 text-center px-2 py-2 rounded-[5px] my-auto">
                            <Trophy className="text-white" />
                        </div>
                        <div className="flex  flex-col">
                            <span className="font-bold text-3xl">0</span>
                            <span>Badges</span>
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-5">
                    <Button
                        type="button"
                        className="rounded-[5px]"
                        handleClick={() => navigate("/generate")}
                    >
                        <Plus className="text-white" />
                        Create New Deck
                    </Button>
                    <Button
                        type="link"
                        className="rounded-[12px] px-2 py-2"
                        to="/generate"
                    >
                        <Upload />
                        Upload PDF
                    </Button>
                    <Button type="link" className="rounded-[12px] px-2 py-2">
                        <Target />
                        Manage Tasks
                    </Button>
                    <Button type="link" className="rounded-[12px] px-2 py-2">
                        <File />
                        View Stats
                    </Button>
                </div>

                <div className="flex gap-3 w-[100%] justify-center">
                    <input
                        type="text"
                        placeholder="🔍Search decks..."
                        className="flex w-[98%] border-1 border-gray-400 py-[5px] px-[5px] rounded-[7px]"
                    />
                    <button
                        type="link"
                        className="bg-black text-white px[5px] py-[3px] w-13 rounded-[20px] hover:cursor-pointer hover:bg-gray-600"
                    >
                        All
                    </button>
                </div>
            </div>

            <Decks />

            <div className="fixed bottom-4 right-4 rounded-full w-13 h-13 bg-gradient-to-r from-[#52357B] to-[#5459AC] flex items-center justify-center">
                <TimerIcon className="text-white w-6 h-6" />
            </div>
        </div>
    );
};

export default Dashboard;
