import { Checkbox } from "@/components/ui/checkbox"
import { type ItemsProps } from "@/types";


function ListGroup({items, onToggle} :ItemsProps) {
    return (
    <>
    {items.length > 0 ? items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
            <Checkbox checked={item.checkState} onClick={() => onToggle(idx)} />
            <div>
                <p className={item.checkState ? "line-through" : "" }>{item.title}</p>
            </div>
        </div>
    )) : <p className="text-sm font-normal text-gray-600">To<span className="font-medium">Do</span> List is Empty</p>}
    </>
    )
}
export default ListGroup;