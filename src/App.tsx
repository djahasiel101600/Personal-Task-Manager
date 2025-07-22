import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Input } from './components/ui/input'
import ListGroup from './components/ui/list-group'

import { type ItemProps } from './types'
import {useForm, type SubmitHandler} from 'react-hook-form'

import { FaPlusCircle } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { todo } from 'node:test'

export type FilterType = "All" | "Done" | "Undone" | "Search";

function App() {

  const [toDoList, setToDoList] = useState<ItemProps[]>([])
  const {register, handleSubmit, reset} = useForm<ItemProps>();
  const onSubmit:SubmitHandler<ItemProps> = data => {
    setToDoList(prevItems => [...prevItems, {checkState:false, title:data.title,description:data.description}]);
    reset();

  }

  const [filteredToDo,setFilteredToDo] = useState<ItemProps[]>([])
  const [selectionFilter, setSelectionFilter] = useState<FilterType>('All')
  const handleSearchFilter = (value:string) => {
    setSelectionFilter("Search");
    setFilteredToDo(prevItems => prevItems.map((item) => item.title.includes(value) ? {...item} : item));
  }
  const handleFilterChange = (value:string) => {
    setSelectionFilter(value as FilterType);
    switch (value) {
      case "Done":
        setFilteredToDo(toDoList.filter(item => item.checkState));
        break;
      case "Undone":
        setFilteredToDo(toDoList.filter(item => !item.checkState));
        break;
      case "All":
        setFilteredToDo(toDoList);
        break;
      }
  }

  return (
    <>
    <div className='p-2 font-medium h-screen'>
      <h1 className="text-2xl">
        TODO LIST
      </h1>
      <div className="flex gap-2 my-4">
        <Input placeholder='Search...' onChange={(e) => handleSearchFilter(e.target.value)}/>
        <Select onValueChange={(value) => handleFilterChange(value)} defaultValue='All'>
          <SelectTrigger className="w-[180px] bg-black text-white">
            <SelectValue placeholder="Filter" className='text-white' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
            <SelectItem value="Undone">Undone</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='mt-4'>
        <ListGroup items={filteredToDo.length > 0 ? filteredToDo : toDoList } onToggle={(idx) => setToDoList(prevItems => prevItems.map((item, i) => i===idx ? {...item, checkState:!item.checkState} : item ))} />
      </div>
      <Dialog>
      <DialogTrigger>
      <div className='absolute bottom-0 right-0'>
        <FaPlusCircle className='text-4xl m-3 cursor-pointer'/>
      </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-start'>Create ToDo</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-2'>
              <Input {...register('title')} placeholder='Title'/>
              <Textarea {...register('description')} placeholder='Description'/>
              <Button type='submit' className='px-5'>Save</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
      
    </div>
    </>
  )
}

export default App
