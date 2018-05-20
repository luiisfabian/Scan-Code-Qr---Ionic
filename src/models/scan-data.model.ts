export class ScanData{
  tipo:string;
  info:string;
  lat:number;

  constructor(texto:string){
    this.tipo = "Texto no definido";
     this.info = texto;

    if (texto.startsWith("http")) {
      this.tipo = "http";
    }else if(texto.startsWith("geo")){
      this.tipo = "mapa";
    }else if(texto.startsWith("BEGIN:VCARD")){
      this.tipo = "contacto";
    }else if(texto.startsWith("MATMSG")){
      this.tipo = "email"
    }

  }

}
