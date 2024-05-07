import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Menssage, RoutersLink } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-two-step-verification',
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.css']
})
export class TwoStepVerificationComponent implements OnInit {
  tfa: any = {};
  authcode: string = "";
  errorMessage: any;
  temporal: any;

  test: Date = new Date();
  public textAlert: any;
  public token: boolean = false;
  public validateToken: any;
  public customerDetail: any = [];
  public toggleButton: any;
  public sidebarVisible: boolean;
  public nativeElement: Node;
  public form: FormGroup;
  public api = environment.img
  public qrBase64temp: string
  qrBase64: any;
  constructor(private element: ElementRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private _https: AuthService,
    private alert: AlertService,
    private localStore: LocalstoreService) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.textAlert = Menssage;
    let token = "ErLCUZBtopFI7hfx4ShACW8OROgHhL2h6eh4RVKQas02QaMn5w";
    this.getCustomerDetail(token)
    let reload = this.localStore.getItem("reload")
    if (reload != "reload") {
      this.localStore.setItem("reload", "reload")
      window.location.reload()
    }
    this.getAuthDetails();
    if(localStore.getItem('token_Verfy')){
      this.token = true;
      //this.qrBase64temp = localStore.getItem('token_Verfy')
    }
  }

  ngOnInit() {
    //this.alert.loading();
    //particlesJS.load('particles-js', '../assets/particle.json', null);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0] ? navbar.getElementsByClassName('navbar-toggler')[0] : 0;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    body.classList.add('off-canvas-sidebar');
    const card = document.getElementsByClassName('card')[0];
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove('card-hidden');
    }, 700);
    this.initial();
  }
  initial() {
    /* if (localStorage.getItem('token') !== null) {
      this.router.navigate([RoutersLink.home]);
    } */
    this.form = this.formBuilder.group({
      password: ["", Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
    });
  }

  sidebarToggle() {
    if (this.toggleButton != null || this.toggleButton != undefined) {
      var toggleButton = this.toggleButton;
      var body = document.getElementsByTagName('body')[0];
      var sidebar = document.getElementsByClassName('navbar-collapse')[0];
      if (this.sidebarVisible == false) {
        setTimeout(function () {
          toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
      } else {
        if (this.toggleButton != undefined) {
          console.log("ojo")
          this.toggleButton.classList.remove('toggled');
        }
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
      }
    }
  }

  getCustomerDetail(item: string) {
    this.alert.loading();
    this._https.getCustomerDetail(item).then((resulta: any) => {
      console.log(resulta);
      this.customerDetail = resulta
      this.localStore.removeEnd("reload")
      this.localStore.setItem(resulta, Menssage.customerDetail)
      this.alert.messagefin();
    }).catch((err: any) => {
      console.log(err)
      this.alert.error(Menssage.error, Menssage.server);
    });
  }

  onSubmit() {
    this.authcode = this.form.controls['password'].value
    console.log(this.temporal)
    this._https.verifyAuth(this.authcode).then((data) => {
      const result = data
      console.log('esta es data ', data)
      if (result['status'] === 200) {
        
        console.log(result);
        this.errorMessage = null;
        this.tfa.secret = this.tfa.tempSecret;
        this.tfa.tempSecret = "";
        this.alert.success('Ok', 'En hora buena puedes continuar');
        this.router.navigate([RoutersLink.content]);
      } else {
        this.alert.error('Error', 'Codigo incorrecto')
      }
    });
  }
  existingToken(){
    
    console.log('El token existe');
    this.validateToken = this.form.controls['password'].value;
    if(this.validateToken == this.localStore.getItem('token_Verfy')){
      this.alert.success('Ok', 'Puedes continuar')
      //AQUI VA LA RUTA AL HOME
    }else{
      this.alert.error('Error', 'Clave incorrecta')
    }

  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  valid(item: any): boolean {
    let valid = true
    if (item.email === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.email);
      valid = false
    }
    if (item.password === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.password);
      valid = false
    }
    return valid
  }
  getAuthDetails() {
    this._https.getAuthVerification().then((data) => {
      const result = data
      if (data['status'] === 200) {
        this.setup();
        console.log(result);

      } else {
        this.tfa = result;
        console.log('este es el tfa que no esta registardo ', this.tfa)

      }
    });
  }
  setup() {
    this._https.setupAuth().then((data) => {
      const result = data;
      console.log(result, 'esta es la respuesta del setup')
      if (data['message'] === 'TFA Auth needs to be verified') {
        console.log(result);
        this.tfa = result;
        this.qrBase64 = this.tfa.dataURL;
        this.localStore.setItem(this.qrBase64, 'token_Verfy')
        this.qrBase64temp = this.localStore.getItem('token_Verfy');
        console.log('este es qrbase64 ', this.qrBase64temp)
      }
    });
  }

}
