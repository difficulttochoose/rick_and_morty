//Rick and Morty API - Analize!!! Count... Filter...
console.log("rick and morty");
axios
    .get('https://rickandmortyapi.com/api/character/')
    .then(res => {
        const { pages } = res.data.info
        Promise.all([...new Array(pages)].map((el, i) => axios.get(`https://rickandmortyapi.com/api/character/?page=${i + 1}`)))
            .then(res => {
                console.log('Array of arrays of characters:', res);
                let sortType = prompt('Enter sort type without separator\n' +
                    '(no more than one from one category):\n' +
                    'status: Alive = 1, Dead = 2, unknown = 3\;\n' +
                    'gender: Female = 4, Male = 5, Genderless = 6, unknown = 7');
                sortType.split(' ');
                let sortStatus = '', sortGender = '';
                let result = [];
                for (let k = 0; k < res.length; k++) {
                    for (let j = 0; j < res[k].data.results.length; j++) {
                        for (let g = 0; g < sortType.length; g++) {
                            switch (sortType[g]) {
                                case '1': sortStatus = 'Alive';
                                    break;
                                case '2': sortStatus = 'Dead';
                                    break;
                                case '3': sortStatus = 'unknown';
                                    break;
                                case '4': sortGender = 'Female';
                                    break;
                                case '5': sortGender = 'Male';
                                    break;
                                case '6': sortGender = 'Genderless';
                                    break;
                                case '7': sortGender = 'unknown';
                                    break;
                            }
                        }
                        if (sortStatus == res[k].data.results[j].status && sortGender == res[k].data.results[j].gender) {
                            result.push(res[k].data.results[j]);
                        }
                        else if (sortStatus == res[k].data.results[j].status && !sortGender) {
                            result.push(res[k].data.results[j]);
                        }
                        else if (!sortStatus && sortGender == res[k].data.results[j].gender) {
                            result.push(res[k].data.results[j]);
                        }
                    }
                }
                console.log('RESULT:', result);
            })
    })