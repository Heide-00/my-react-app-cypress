import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

const initialValues={
  ad:"",
 soyad:"",
 email:"",
 password:"",
}

//Hata mesajlarını oluşturacağım.
export const errorMessages={
  ad:"Adınızı en az 3 karakter giriniz",
  soyad:"Soyadınızı en az 3 karakter giriniz",
  email:"Geçerli bir email adresi giriniz",
  password:"En az 8 karakter,en az bir büyük harf,en az bir küçük harf,en az bir sembol,en az bir rakam içermelidir",
}

export default function Register(){
  //Formdata'yı tutacak bir tane state oluşturuyorum.
  const [formData,setFormData]=useState(initialValues);
  //Validasyon ekleyeceğim.
const [errors,setErrors]=useState({
  ad:false,
  soyad:false,
  email:false,
  password:false,
})
//Güncelleme için
const [isValid,setIsValid]=useState(false);
//response.data da bulunan id yi ekranda göstereceğim.
const [id,setId]=useState("");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

//isvalid kontrolü yapıldı.
useEffect(()=>{
  if(
    formData.ad.trim().length>=3 &&
    formData.soyad.trim().length>=3 &&
    validateEmail(formData.email) &&
    regex.test(formData.password)
    ){
      setIsValid(true);
    }else{
      setIsValid(false);
    }
},[formData]);


//handleChange fonksiyonu oluşturdum(kullanıcının yazdığı veriyi takip etmek için)
  const handleChange=(event)=>{
  //name ve value 'i destruct ediyorum.
  const {name,value}=event.target;
  //Form datadaki bilgileri değiştireceğim.
  setFormData=({...formData,[name]:value});
  //Validasyon yapıldı.
  if(name=="ad" || name=="soyad"){
    if(value.trim().length>=3){
      setErrors({...errors,[name]:false})
    }else{
      setErrors({...errors,[value]:true})
    }
  }

  if(name=="email"){
    if(validateEmail(value)){
      setErrors({...errors,[name]:false})
    }else{
      setErrors({...errors,[name]:true})
    }
  }

  if(name==password){
    if(regex.test(value)){
      setErrors({...errors,[name]:false})
    }else{
      setErrors({...errors,[name]:true})
    }
  }
};

//handleSubmit fonksiyonunda form verileri axios kullanılarak sunucuya gönderildi.
  const handleSubmit=(event)=>{
    //Sayfanın baştan yüklenmesini engelliyorum.
    event.preventDefault();
    if(!isValid) return;
    axios.post("https://reqres.in/api/users",formData).then((response)=>{
      setId(response.data.id);
      setFormData(initialValues)
    })
    .catch((error)=>{
      console.error(error);
    })
  }
  //İnput dışında hata mesajları oluşturuldu.
    return (
    <Card>
<CardHeader>
 Kayıt Ol
</CardHeader>
  <CardBody>
    <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="ad">Ad:</Label>
   <Input
      id="ad"
      name="ad"
      placeholder="Adınızı giriniz"
      type="text"
      onChange={handleChange}
      value={formData.ad}
      invalid={errors.ad}
      data-cy="ad-input"
    />
    
    {errors.ad &&  <FormFeedback data-cy="error-message">{errorMessages.ad}</FormFeedback>}
  </FormGroup>
   <FormGroup>
    <Label for="soyad">Soyad:</Label>
    <Input
      id="soyad"
      name="soyad"
      placeholder="Soyadınızı giriniz"
      type="text"
      onChange={handleChange}
      value={formData.soyad}
      invalid={errors.soyad}
      data-cy="soyad-input"
   />
   {errors.soyad && <FormFeedback data-cy="error-message">{errorMessages.soyad}</FormFeedback>}
   
  </FormGroup>
     <FormGroup>
    <Label for="email">Email:</Label>
    <Input
      id="email"
      name="email"
      placeholder="Kurumsal email adresinizi giriniz"
      type="email"
      onChange={handleChange}
      value={formData.email}
      invalid={errors.email}
      data-cy="email-input"
    />
      {errors.email && <FormFeedback data-cy="error-message">{errorMessages.email}</FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="password">Password:</Label>
     <Input
      id="password"
      name="password"
      placeholder="Güçlü bir password seçiniz"
      type="password"
      onChange={handleChange}
      value={formData.password}
      invalid={errors.password}
      data-cy="password-input"
    />
      {errors.password && <FormFeedback data-cy="error-message">{errorMessages.password}</FormFeedback>}
    </FormGroup>
 <Button disabled={!isValid} data-cy="submit-button">
    Kayıt Ol
  </Button>
</Form>
</CardBody>
{id && <CardFooter data-cy="response-messages">
  ID: {id}
</CardFooter>}
</Card>
   
    );
}