import logo from './logo.svg';
import './App.css';
import { Box, Button, Center, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RepoCard from './components/RepoCard';
import loader from './components/loader.gif';

function App() {
  const [repos,setRepos]=useState([])
  const [query,setQuery]=useState("all")
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)
  const getRepos=async (page,query)=>{
    setLoading(true)
    // let response=await axios.get(`https://api.github.com/search/repositories?q=stars:%3E1&page=${page}&per_page=10+language:${query}`)
    let response=await axios.get(`https://api.github.com/search/repositories?q=stars:%3E1+language:${query}`)
    let data=response
    console.log(data.data.items)
    setRepos(data.data.items)
    setLoading(false)
  }
  useEffect(()=>{
    getRepos(page,query)
  },[page,query])

  if(loading){
    return <Center mt='400px'><img src="https://i.ibb.co/dcQJ8RF/1476.gif" alt="1476" border="0" /></Center>
  }
  return (
    <>
    <div style={{display:"flex",justifyContent:"space-around",marginTop:"100px"}}>
      <Button onClick={()=>setQuery("all")} variant='outline' colorScheme="teal" isActive={query==="all"}>All</Button>
      <Button onClick={()=>setQuery("html")} variant='outline' colorScheme="teal" isActive={query==="html"}>HTML</Button>
      <Button onClick={()=>setQuery("css")} variant='outline' colorScheme="teal" isActive={query==="css"}>CSS</Button>
      <Button onClick={()=>setQuery("javascript")} variant='outline' colorScheme="teal" isActive={query==="javascript"}>JavaScript</Button>
    </div>
    <SimpleGrid columns={[1, 2, 4]} spacing='40px'>
      {repos.map((repo)=><RepoCard name={repo.name} language={repo.language} image={repo.owner.avatar_url} forks={repo.forks} stars={repo.stargazers_count} url={repo.clone_url}  />)}
</SimpleGrid>
    </>
  );
}

export default App;
 //https://api.github.com/search/repositories?q=stars:%3E1&page=1&per_page=10+language:all