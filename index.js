const fs = require('fs');
const superagent = require('superagent');

//created the promise
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not fins that file😥');
            resolve(data);
        })
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write the file')
            resolve('Successfully written the file')
        })
    })
}

//with async and await
/*
const getDogPic = async () => {
    try {
        //1 get the data from the dog.txt file
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        //apss the ${data} to the API and save the api data
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        //write the gotten data into file dog-img.txt
        await writeFilePro('dog-img.txt', res.body.message);
        console.log('dog img file ahs been written');
    } catch (err) {
        console.log(err.message);
        throw (err);
    }
    return '2. ready';
}
*/

//handling multiple promises simultaneously
const getDogPic = async () => {
    try {
        //1 get the data from the dog.txt file
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        //apss the ${data} to the API and save the api data
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        //saving all 3 response data into array
        const imgs = all.map(el => el.body.message);
        console.log(imgs);


        //write the gotten data into file dog-img.txt
        await writeFilePro('dog-img.txt', imgs.join('\n\n'));
        console.log('dog img file ahs been written');
    } catch (err) {
        console.log(err.message);
        throw (err);
    }
    return '2. ready';
}

//another method for returing the value from upper async function and 
(async () => {
    try {
        console.log('1 will get the dog pic');
        //below line will retrun the code from that getDogPic function
        const xx = await getDogPic();
        console.log(xx);
        console.log('3 done getting the dog pic');
    } catch (err) {
        console.log('ERROR! 💥')
    }
})();

/*
console.log('1 will get the dog pic');
//returning the value from function
getDogPic()
    .then(result => {
        console.log(`returned result from upper fucntion is == ${result}`);
        console.log('done getting the dog pic');
    })
    .catch(err => {
        console.log('ERROR! 💥');
    });
//console.log('done getting the dog pic');
*/

//consumed the upper promise here
/*
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);

        return superagent
            .get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(res => {
        console.log(res.body.message);

        return writeFilePro('dog-img.txt', res.body.message);

    })
    .then(() => {
        console.log('dog img got saved into the file');
    })
    .catch(err => {
        console.log(err.message);
    });
    */