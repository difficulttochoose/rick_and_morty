//Rick and Morty API - Analize!!! Count... Filter...
console.log("rick and morty");
axios
    .get('https://rickandmortyapi.com/api/character/',)
    .then(res => {
        const {pages} = res.data.info
        localStorage.setItem('password', 'super strong password')

        Promise.all([...new Array(pages)].map((el,i) => axios.get(`https://rickandmortyapi.com/api/character/?page=${i+1}`)))
            .then(res => console.log(res));
            
        
    })