const form = document.querySelector("#form");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputTelefone = document.querySelector("#telefone");
const inputRua = document.querySelector("#rua");
const inputNumero = document.querySelector("#numero");
const inputComplemento = document.querySelector("#complemento");
const inputCidade =  document.querySelector("#cidade");
const inputEstado = document.querySelector("#estado");
const inputCep = document.querySelector("#cep");
const mensagemDeErro = document.querySelectorAll (".campo-verificado");
const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


form.addEventListener("submit", (event) => {
    event.preventdefault();
});

function setError(input){

  const campoGrupo = input.parentElement;
  const mensagemDeErro = campoGrupo.querySelector(".campo-verificado");
  mensagemDeErro.classList.add("span-error");
  input.classList.remove("validate")
  return false;
}

function removeError(input){

    const campoGrupo = input.parentElement;
    const mensagemDeErro = campoGrupo.querySelector(".campo-verificado");
    mensagemDeErro.classList.remove("span-error");
    input.classList.add("validate")
    return true;
}

 function validateNome(input) {
    if(inputNome.value.length < 3){

        setError(input)
    }
    else{
        removeError(input)
    }
 }

function validateEmail(input){
  if(!emailregex.test(inputEmail.value)){
    
    setError(input)
  }
  else{
    removeError(input)
  }
}

function validateTelefone(input){

  if(inputTelefone.value.length < 11){
    setError(input)
  }
  else{
    removeError(input)
  }
}

  inputTelefone.addEventListener("input" , ()=> {

  let limparValor = inputTelefone.value.replace(/\D/g, "").substring(0,11);

  let numerosArray = limparValor.split("");

  let numeroFormatado ="";

  if(numerosArray.length> 0){

  numeroFormatado += `(${numerosArray.slice(0,2).join("")})`;
  }

  if(numerosArray.length> 2){

    numeroFormatado += `${numerosArray.slice(2,7).join("")}`;
  }

  if(numerosArray.length> 7){

    numeroFormatado += `-${numerosArray.slice(7,11).join("")}`;
  }

  inputTelefone.value = numeroFormatado;
  })

function validateCep(input){
  
  let inputCep = input.value.replace(/\D/g, '');
  inputCep = inputCep.slice(0, 8);

  if (inputCep.length <= 6 && inputCep.length !== 8) {
      input.value = input.value.replace(/\D/g, '');
      setError(input)
  } else {
      removeError(input)
      input.value = inputCep.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
  }

}

function desativeButton(){

const inputNome = document.querySelector ("#nome").value;
const inputEmail = document.querySelector("#email").value;
const inputTelefone = document.querySelector("#telefone").value;
const inputCep = document.querySelector("#cep").value;

 if(inputNome && inputEmail && inputTelefone && inputCep){
  document.querySelector("#logar").disabled = false
 }
 else{
document.querySelector("#logar").disabled = true
}
}

  const consultarCep = (cep) => {

    let endpoint = "https://viacep.com.br/ws/"+cep+"/json/";

fetch(endpoint,{
    method: "GET",
    headers:{ "content-type": "application/json"} 
  })
  .then(response => response.json())
  .then(result => {
    
        inputRua.value = result.logradouro;
        inputCidade.value = result.localidade;
        inputEstado.value = result.uf;

  })
  .catch(erro => console.log(erro))

  }

  inputCep.addEventListener("input", ()=>{

    if(inputCep.value.length > 7){

      consultarCep(inputCep.value);

    }

  })
  
  // function alert(){
  //   Swal.fire({
  //     title: "Seu formulário foi enviado!",
  //     icon: "success",
  //     showConfirmButton: false,
  //     timer: 1500
  //   });
  // }

 function salvar(){
  localStorage.info = document.querySelector("#nome").value;
  localStorage.info = document.querySelector("#email").value;
  
  

 }
  
 