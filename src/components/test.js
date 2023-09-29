const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmQzMWE0MmViZjY3NjQ0OWVmYmYyOTAxNDNmYzcwYSIsInN1YiI6IjY1MDJkMzg1ZmZjOWRlMGVkZWQ1MmYwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0U63o2TKeAk_FSPagez9SRp3taEa8EKvp891tGfnYKM'
  }
};
   /*fetch('https://api.themoviedb.org/3/authentication', options)
  .then(response => response.json())
  .then(response => console.log(response) )
  .catch(err => console.error(err));*/

async function moviegetir(bölüm="movie/popular",sayfa_no="page=1",dil="tr-tr"){
    return await  fetch("https://api.themoviedb.org/3/"+bölüm+"?page="+sayfa_no+"&language="+dil, options)
}


  export { options,moviegetir }