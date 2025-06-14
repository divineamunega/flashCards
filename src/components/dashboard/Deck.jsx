import { Trash } from "lucide-react";
import Button from "../Button";

const Deck = ({ name, description, number, date, tag, onDelete, onStudy }) => {
    return (
        <div className="p-5 bg-white shadow-md flex flex-col gap-3 rounded-md">
            <div className="flex justify-between items-start">
                <span className="font-bold text-lg">{name}</span>
                <button onClick={onDelete}>
                    <Trash className="text-red-500" />
                </button>
            </div>

            <div className="text-sm text-gray-700">{description}</div>

            <div className="flex justify-between text-sm text-gray-600">
                <span>Cards</span>
                <span>{number}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
                <span>Last Studied</span>
                <span>{date}</span>
            </div>

            <div>
                <span className="p-2 bg-gray-200 rounded-2xl text-xs">
                    {tag}
                </span>
            </div>

            <div className="flex justify-center">
                <Button type="button" handleClick={onStudy}>
                    Study Now
                </Button>
            </div>
        </div>
    );
};

export default Deck;
