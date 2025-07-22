export interface ItemProps {
    checkState: boolean;
    title: string;
    description: string;
}

export interface ItemsProps {
    items: ItemProps[];
    onToggle: (index: number) => void;
}

export interface FilterProps {
    filter: 'All' | 'Done' | 'Undone'
}