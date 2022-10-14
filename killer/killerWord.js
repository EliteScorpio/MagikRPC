fs = require('fs')
const { exec } = require('node:child_process');
const dataPIDWord = './killer/PIDs/WordPID.log'

fs.readFile(dataPIDWord, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
    exec(`taskkill /PID ${data} /F`, (error, stdout, stderr) => {
    if (error) {
           console.log(`error: ${error.message}`);
        return;
        }
         if (stderr) {
         console.log(`stderr: ${stderr}`);
        return;
 }
     console.log(`stdout: ${stdout}`);

     const removeLines = (data, lines = []) => {
      return data
          .split('\n')
          .filter((val, idx) => lines.indexOf(idx) === -1)
          .join('\n');
    }

      fs.readFile(dataPIDWord, 'utf8', (err, data) => {
        if (err) throw err;
  
        fs.writeFile(dataPIDWord, removeLines(data, [0]), 'utf8', function(err) {
          if (err) throw err;
            console.log("the lines have been removed.");
      });
  })
  
})
})
