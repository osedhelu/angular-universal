import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, aling, from, status } from '@services/alertService/alert.service';
import { UsersService } from '@services/UsersService/Users.service';
import { Web3Service } from '@services/web3Service/web3.service';
import { PaisesService } from '@services/PaisesService/paises.service';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface IUser {
  email: string;
  usuario_comun: string; //TODO: CAS-42 actualizamos el schima de usuarios
  password: any;
  password_compare?: string;
  nombre?: string;
  apellidos?: string;
  celular?: string;
  role?: string;
  estado?: boolean;
  primera_vez?: boolean;
  patrocinador?: any;
  country?: any;
  MyID?: any;
  PadreID?: any;
  username?: any;
  saldo?: {
    saldo: any;
    ahorro: any;
  };
  _id?: any;
  address_wallet?: any;
}
interface inUser {
  Sponsor?: sponsor,
  Username?: any,
  FirstName?: any,
  LastName?: any,
  wallet?: any,
  country?: iPais,
  Phone?: any,
  Email?: any
  Password?: any,
  password_compare?: any

}
interface sponsor {
  _id: any,
  username: any
}
interface iPais {
  iso2: string
  iso3: string
  name: string
  nom: string
  nombre: string
  phone_code: string
  _id: string
}
const sendRequest = (value: string) => {

};
@Component({
  selector: 'app-user-profile',
  templateUrl: './signup.component.html',
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  Usuario: inUser = {
    wallet: '',
    Email: '',
    FirstName: '',
    LastName: '',
    Phone: '',
    Password: '',
    Sponsor: null,
    Username: '',
    country: null,
    password_compare: ''
  }
  phoneRules: any = {
    N: /^999/,
    X: /[02-9]/,
  }
  phonePattern: any = /^[02-9]\d{9}$/;

  wallet: any;
  Paises: any[] = []
  searchModeOption = 'startsWith';
  searchExprOption: any = 'name';
  searchTimeoutOption = 200;
  minSearchLengthOption = 0;
  positions: string[];
  buttonOptions: any = {
    text: 'Register',
    type: 'success',
    useSubmitBehavior: true,
    onClick: function () {
      // console.log(this)
      // Implement your logic here
    }
  };

  states: string[];
  dijitoTele: any = ''
  constructor(
    private _paises: PaisesService,
    public _web3: Web3Service,
    private activateRouter: ActivatedRoute,
    private _user: UsersService,
    private _alert: AlertService,
    private router: Router

  ) { }
  passwordComparison = () => this.form.instance.option('formData').Password;
  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true,
      };
    };
  }
  ngOnInit() {
    this.getPaises()
    this.activateRouter.params.subscribe((resp: any) => {
      this.Usuario.Sponsor = resp.id
      if (!!localStorage.getItem('sponsor')) {
        this._user.getInfoUser(localStorage.getItem('sponsor')).then((e) => {
          this.Usuario.Sponsor = e
        })

      } else {
        this._user.getInfoUser(resp.id).then((e) => {
          this.Usuario.Sponsor = e
          if (resp.id !== 'nuevo') {
            localStorage.setItem('sponsor', e._id)
          }
        }).catch((e) => {
          this._user.getInfoUser('nuevo').then((e) => {
            this.Usuario.Sponsor = e
          })
        })
      }
      // this.idPatricinador = resp.id;
      // this.getPatrocinador(resp.id);
    });
    this.asyncValidation = this.asyncValidation.bind(this)
    this._onFormSubmit = this._onFormSubmit.bind(this)
  }
  async getPaises(): Promise<void> {
    this._paises.get().subscribe((resp: any) => {
      this.Paises = resp.data
    })
  }
  keyDown(e) {
    if (e.selectedItem) {
      console.log(e.selectedItem)
      this.Usuario.country = e.selectedItem
    }
  }
  // onFormSubmit = function (e) {
  //   console.log('holllllllllllllllllllllll')
  //   e.preventDefault();
  // };
  async _onFormSubmit(e) {
    try {
      e.preventDefault();
      const { web3 } = this._web3;



      const User: IUser = {
        email: this.Usuario.Email,
        password: this.Usuario.Password,
        password_compare: this.Usuario.password_compare,
        address_wallet: (await this._web3.getAccount()),
        usuario_comun: this.Usuario.Username,
        nombre: this.Usuario.FirstName,
        apellidos: this.Usuario.LastName,
        username: this.Usuario.Username,
        patrocinador: !!this.Usuario.Sponsor ? this.Usuario.Sponsor._id : 'nuevo',
        celular: this.Usuario.Phone,
        country: this.Usuario.country._id
      }

      console.log(User)


      this._user.add(User).pipe(catchError((err: any) => {
        const { error } = err
        console.log('errorr', error)
        this._alert.show(from.bottom, aling.right, status.error, error.message)
        return throwError(e)

      })).subscribe(resp => {

        this._alert.show(from.bottom, aling.right, status.success, 'nuevo usuario')
        this.router.navigate(['/packages'])

      })
      e.preventDefault();
    } catch (err) {
      console.log(err)

    }
  }
  asyncValidation(params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (params?.value.match('@gmail|@hotmail|@yafuz|@admin')) {
          resolve(true);
        } else {
          reject(false);
        }
      }, 1000);
    });
  }
}


