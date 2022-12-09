import React, {useState, useEffect} from 'react';
import { 
    Box, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    useDisclosure,
    ModalCloseButton, } from '@chakra-ui/react'

export default function Quotes(){
    //GET ALL -> fetch dari url 'localhost:3000/quotes.
    // -> Silahkan get all data
    const [data, setData] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(()=>{
      fetch('http://localhost:3000/books')
      .then((res)=>res.json())
      .then((json) => setData(json))
    }, [])

    return(
        <>
        <Box w='100%' p={4}>
            <Button onClick={onOpen} mr={3} mb={3}>Tambah data</Button>
            {data && data.map((item)=> {
                return(
                <Box bg='tomato' w='100%' p={4} color='white'>
                    <h1>{item.author}</h1>
                    <h1>{item.quotes}</h1>
                </Box>
                )
            })}  
        </Box>
        </>
    )
}