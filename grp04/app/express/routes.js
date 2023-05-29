const express = require('express');
const cors = require('cors');
const port = 3000;
let sen_pref = [], sen_ex = [], sen_ge = [], lista = [6], contsg = 0, contsp = 0, contse = 0, indexsg = 0, indexsp = 0, indexse = 0, check = false, temp, typetemp;
const data = new Date(), getFullAno = data.getFullYear(), ano = getFullAno.toString().slice(-2), mes = data.getMonth() + 1, dia = data.getDate();

const app = express();
app.use(cors());

app.use(express.json()); // Middleware para fazer o parsing do corpo da requisição como JSON

// app.post("/passrequest", (req, res) => {
//   try {
//     const pass = req.body;
//     const tipo = parseInt(pass.t);
//     let aux;

//     switch (tipo) {
//       case 1:
//         aux = contsg + 1;
//         if (aux < 10)
//           aux = "0" + aux;
//         sen_ge[contsg] = ano + "" + mes + "" + dia + "-" + "SG" + aux;
//         res.json(sen_ge[contsg]);
//         contsg++;
//         break;

//       case 2:
//         aux = contsp + 1;
//         if (aux < 10)
//           aux = "0" + aux;
//         sen_pref[contsp] = ano + "" + mes + "" + dia + "-" + "SP" + aux;
//         res.json(sen_pref[contsp]);
//         contsp++;
//         break;

//       case 3:
//         aux = contse + 1;
//         if (aux < 10)
//           aux = "0" + aux;
//         sen_ex[contse] = ano + "" + mes + "" + dia + "-" + "SE" + aux;
//         res.json(sen_ex[contse]);
//         contse++;
//         break;

//       default:
//         res.status(400).json({ error: "Tipo de pass inválido" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Erro interno do servidor" });
//   }
// });

app.post("/passrequest", (req, res) => {
  try {
    const pass = req.body;
    const tipo = parseInt(pass.t);
    let aux=0;

    switch (tipo) {
      case 1:
        typetemp=1
        aux = contsg + 1;
        if (aux < 10)
          aux = "0" + aux;
        temp = ano + "" + mes + "" + dia + "-" + "SG" + aux;
        res.json(temp);
        break;

      case 2:
        typetemp=2
        aux = contsp + 1;
        if (aux < 10)
          aux = "0" + aux;
        temp = ano + "" + mes + "" + dia + "-" + "SP" + aux;
        res.json(temp);
        break;

      case 3:
        typetemp=3
        aux = contse + 1;
        if (aux < 10)
          aux = "0" + aux;
        temp = ano + "" + mes + "" + dia + "-" + "SE" + aux;
        res.json(temp);
        break;

      default:
        res.status(400).json({ error: "Tipo de pass inválido" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
app.get("/passtemp", (req, res)=>{
  try{
    res.json(temp)
  }catch(error){

  }
})
app.get("/typetemp", (req, res)=>{
  try{
    let aux;
    switch(typetemp){
      case 1: 
        aux= "Senha Geral"
        break
      case 2:
        aux="Senha Prioritária"
        break
      case 3:
        aux="Senha de Exame"
        break
      default:
        aux= error
    }
    res.json(aux)
  }catch(error){

  }
})

app.get("/passconfirm", (req,res)=>{
  try{
    switch(typetemp){
      case 1:
        sen_ge[contsg] = temp
        aux= sen_ge[contsg] 
        contsg++
        break
      case 2:
        sen_pref[contsp] = temp
        aux = sen_pref[contsp]
        contsp++
        break
      case 3:
        sen_ex[contse] = temp
        aux = sen_ex[contse]
        contse++
        break
    }
    res.json({"password": temp})
  }catch(error){
    console.log(error)
  }
});

app.get("/nextpassword", (req, res) => {
  fila();
  const aux = {
    p0: lista[0],
  };
  res.json(aux);
});
app.get("/allpasswords", (req, res) => {
  const aux = {
    p0: lista[0],
    p1: lista[1],
    p2: lista[2],
    p3: lista[3],
    p4: lista[4],
    p5: lista[5]
  };
  res.json(aux);
});

app.listen(port, () => {
  console.log('Servidor iniciado');
});

function fila() {
let auxE=indexse, auxG= indexsg, auxP= indexsp, ch=0
for (cont = 0; cont < 6; cont++) {
  if (sen_pref[indexsp] !== undefined && (!check  || sen_ex[indexse] == undefined)) {
    check = true;
    lista[cont] = sen_pref[indexsp];
    indexsp++;
    if(cont==0)
      ch=2
  } else if (sen_ex[indexse] !== undefined) {
    check = false;
    lista[cont] = sen_ex[indexse];
    indexse++;
    if(cont==0)
      ch=3
  } else if(sen_ge[indexsg] !== undefined){
    check = false;
    lista[cont] = sen_ge[indexsg];
    indexsg++;
    if(cont==0)
      ch=1
  }
  else{
      lista[cont]=null
  }
}
switch(ch){
  case 1: 
      indexse=auxE
      indexsg=auxG+1
      indexsp=auxP
      check = false;
      break
  case 2: 
      indexse=auxE
      indexsg=auxG
      indexsp=auxP+1
      check = true;
      break
  case 3: 
      indexse=auxE+1
      indexsg=auxG
      indexsp=auxP
      check = false;
      break
  }
}
