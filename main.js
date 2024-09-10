(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\TaneloMondacaS\Desktop\tic-tac-toe\src\main.ts */"zUnb");


/***/ }),

/***/ "39AM":
/*!*****************************************************************!*\
  !*** ./src/app/tic-tac-toe/components/juego/juego.component.ts ***!
  \*****************************************************************/
/*! exports provided: JuegoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JuegoComponent", function() { return JuegoComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_juego_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/juego.service */ "DT8M");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");




function JuegoComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function JuegoComponent_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const i_r1 = ctx.index; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r2.jugar(i_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r1 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("id", i_r1);
} }
class JuegoComponent {
    constructor(jugarService) {
        this.jugarService = jugarService;
        this.isPlayerOne = true;
        this.casillas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.jugador = 1;
        this.primeraJugada = false;
        this.lineas = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.detenerJuego = () => {
            return this.hayGanador || this.hayEmpate;
        };
    }
    ngOnInit() {
        this.iniciarSubs();
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    iniciarSubs() {
        const subGanador = this.jugarService.hayGanador$.subscribe((resp) => {
            this.hayGanador = resp;
        });
        const subEmpate = this.jugarService.hayEmpate$.subscribe((resp) => {
            this.hayEmpate = resp;
        });
        const subMaquina = this.jugarService.vsMaquina$.subscribe((resp) => {
            console.log('cambio de adversario', resp);
            this.vsMaquina = resp;
        });
        const subReiniciar = this.jugarService.reiniciar$.subscribe(() => this.reiniciar());
        this.subs.add(subGanador);
        this.subs.add(subEmpate);
        this.subs.add(subMaquina);
        this.subs.add(subReiniciar);
    }
    jugar(indexCasilla) {
        if (!this.isPlayerOne && this.vsMaquina)
            return;
        if (this.detenerJuego()) {
            return;
        }
        const casilla = this.casilla(indexCasilla);
        if (casilla.innerHTML == '') {
            casilla.innerHTML = this.isPlayerOne ? 'x' : 'o';
            this.primeraJugada = true;
            this.verificarGanador();
            this.isPlayerOne = !this.isPlayerOne;
        }
        console.log(this.vsMaquina, this.detenerJuego());
        if (this.vsMaquina && !this.detenerJuego()) {
            setTimeout(() => {
                this.jugarIA();
            }, 500);
        }
    }
    casilla(index) {
        return document.getElementById(index.toString());
    }
    jugarIA() {
        if (this.evitarTriunfo()) {
            this.verificarGanador();
            this.isPlayerOne = !this.isPlayerOne;
        }
        else {
            let indexCasilla = this.getRandomInt(9);
            const casilla = this.casilla(indexCasilla);
            if (casilla.innerHTML == '') {
                casilla.innerHTML = 'o';
                this.verificarGanador();
                this.isPlayerOne = !this.isPlayerOne;
            }
            else {
                this.jugarIA();
            }
        }
    }
    evitarTriunfo() {
        // revisar por cada linea si hay dos 'x'
        // si las hay, colocar un 'o' en la que no lo tiene
        let casiGanador = false;
        this.lineas.some((linea) => {
            let conteoX = 0;
            let conteoO = 0;
            linea.forEach((casilla) => {
                const divCasilla = document.getElementById(casilla.toString());
                if (divCasilla.innerHTML == 'x') {
                    conteoX++;
                }
                if (divCasilla.innerHTML == 'o') {
                    conteoO++;
                }
            });
            //TODO: Mejorar funcion de triunfo
            if (conteoO == 2) {
                const index = linea.find((i) => document.getElementById(i.toString()).innerHTML != 'o');
                if (document.getElementById(index.toString()).innerHTML == '') {
                    document.getElementById(index.toString()).innerHTML = 'o';
                    casiGanador = true;
                    return true;
                }
            }
            else if (conteoX == 2) {
                const index = linea.find((x) => document.getElementById(x.toString()).innerHTML != 'x');
                if (document.getElementById(index.toString()).innerHTML == '') {
                    document.getElementById(index.toString()).innerHTML = 'o';
                    casiGanador = true;
                    return true;
                }
            }
        });
        return casiGanador;
    }
    verificarGanador() {
        if (this.verificarLinea()) {
            // this.hayGanador = true;
            this.jugarService.hayGanador$.next(true);
            this.jugador = this.isPlayerOne ? 1 : 2;
        }
        else {
            const hayEmpate = !this.casillas.some((i) => this.casilla(i).innerHTML == '');
            this.jugarService.hayEmpate$.next(hayEmpate);
        }
    }
    verificarLinea() {
        let hayLineaGanadora = false;
        this.lineas.forEach((linea) => {
            const aHTML = this.casilla(linea[0]).innerHTML;
            const bHTML = this.casilla(linea[1]).innerHTML;
            const cHTML = this.casilla(linea[2]).innerHTML;
            if (aHTML !== '' && aHTML == bHTML && bHTML == cHTML) {
                hayLineaGanadora = true;
                this.casilla(linea[0]).style.color = 'green';
                this.casilla(linea[1]).style.color = 'green';
                this.casilla(linea[2]).style.color = 'green';
            }
        });
        return hayLineaGanadora;
    }
    reiniciar() {
        this.primeraJugada = false;
        // this.jugarService.hayGanador$.next(false);
        // this.jugarService.hayEmpate$.next(false);
        this.isPlayerOne = true;
        for (let i = 0; i < 9; i++) {
            this.casilla(i).innerHTML = '';
            this.casilla(i).style.color = 'white';
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
JuegoComponent.ɵfac = function JuegoComponent_Factory(t) { return new (t || JuegoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_juego_service__WEBPACK_IMPORTED_MODULE_2__["JuegoService"])); };
JuegoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: JuegoComponent, selectors: [["app-juego"]], decls: 2, vars: 2, consts: [[1, "juego"], ["class", "casilla", 3, "id", "click", 4, "ngFor", "ngForOf"], [1, "casilla", 3, "id", "click"]], template: function JuegoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, JuegoComponent_div_1_Template, 1, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngFor", ctx.casilla)("ngForOf", ctx.casillas);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: [".juego[_ngcontent-%COMP%] {\r\n  width: 540px;\r\n  text-align: center;\r\n}\r\n\r\n.casilla[_ngcontent-%COMP%] {\r\n  font-size: 10rem;\r\n  width: 170px;\r\n  height: 170px;\r\n  border: 5px solid green;\r\n  float: left;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImp1ZWdvLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLFdBQVc7QUFDYiIsImZpbGUiOiJqdWVnby5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmp1ZWdvIHtcclxuICB3aWR0aDogNTQwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uY2FzaWxsYSB7XHJcbiAgZm9udC1zaXplOiAxMHJlbTtcclxuICB3aWR0aDogMTcwcHg7XHJcbiAgaGVpZ2h0OiAxNzBweDtcclxuICBib3JkZXI6IDVweCBzb2xpZCBncmVlbjtcclxuICBmbG9hdDogbGVmdDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "3pZl":
/*!***********************************************************!*\
  !*** ./src/app/tic-tac-toe/tic-tac-toe-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: TicTacToeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicTacToeRoutingModule", function() { return TicTacToeRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_main_main_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main/main.component */ "zRqU");
/* harmony import */ var _components_juego_juego_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/juego/juego.component */ "39AM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





const routes = [
    {
        path: 'tic-tac-toe',
        component: _components_main_main_component__WEBPACK_IMPORTED_MODULE_1__["MainComponent"],
        children: [
            { path: 'jugar', component: _components_juego_juego_component__WEBPACK_IMPORTED_MODULE_2__["JuegoComponent"], pathMatch: 'full' },
            { path: '', redirectTo: 'jugar', pathMatch: 'full' },
            { path: '**', redirectTo: '' },
        ],
    },
];
class TicTacToeRoutingModule {
}
TicTacToeRoutingModule.ɵfac = function TicTacToeRoutingModule_Factory(t) { return new (t || TicTacToeRoutingModule)(); };
TicTacToeRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: TicTacToeRoutingModule });
TicTacToeRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](TicTacToeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "4mz+":
/*!***************************************************!*\
  !*** ./src/app/tic-tac-toe/tic-tac-toe.module.ts ***!
  \***************************************************/
/*! exports provided: TicTacToeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicTacToeModule", function() { return TicTacToeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _tic_tac_toe_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tic-tac-toe-routing.module */ "3pZl");
/* harmony import */ var _components_main_main_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/main/main.component */ "zRqU");
/* harmony import */ var _components_juego_juego_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/juego/juego.component */ "39AM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class TicTacToeModule {
}
TicTacToeModule.ɵfac = function TicTacToeModule_Factory(t) { return new (t || TicTacToeModule)(); };
TicTacToeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: TicTacToeModule });
TicTacToeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _tic_tac_toe_routing_module__WEBPACK_IMPORTED_MODULE_1__["TicTacToeRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](TicTacToeModule, { declarations: [_components_main_main_component__WEBPACK_IMPORTED_MODULE_2__["MainComponent"],
        _components_juego_juego_component__WEBPACK_IMPORTED_MODULE_3__["JuegoComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _tic_tac_toe_routing_module__WEBPACK_IMPORTED_MODULE_1__["TicTacToeRoutingModule"]] }); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "DT8M":
/*!*******************************************************!*\
  !*** ./src/app/tic-tac-toe/services/juego.service.ts ***!
  \*******************************************************/
/*! exports provided: JuegoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JuegoService", function() { return JuegoService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class JuegoService {
    constructor() {
        this.hayGanador$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
        this.hayEmpate$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
        this.vsMaquina$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
        this.reiniciar$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    reiniciar() {
        this.hayGanador$.next(false);
        this.hayEmpate$.next(false);
        this.reiniciar$.next();
    }
}
JuegoService.ɵfac = function JuegoService_Factory(t) { return new (t || JuegoService)(); };
JuegoService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: JuegoService, factory: JuegoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class AppComponent {
    constructor() {
        this.title = 'tic-tac-toe';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _tic_tac_toe_tic_tac_toe_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tic-tac-toe/tic-tac-toe.module */ "4mz+");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _tic_tac_toe_tic_tac_toe_module__WEBPACK_IMPORTED_MODULE_2__["TicTacToeModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _tic_tac_toe_tic_tac_toe_module__WEBPACK_IMPORTED_MODULE_2__["TicTacToeModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"]] }); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _tic_tac_toe_tic_tac_toe_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tic-tac-toe/tic-tac-toe-routing.module */ "3pZl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const routes = [
    {
        path: '',
        redirectTo: '/tic-tac-toe',
        pathMatch: 'full',
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes), _tic_tac_toe_tic_tac_toe_routing_module__WEBPACK_IMPORTED_MODULE_1__["TicTacToeRoutingModule"]], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"], _tic_tac_toe_tic_tac_toe_routing_module__WEBPACK_IMPORTED_MODULE_1__["TicTacToeRoutingModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zRqU":
/*!***************************************************************!*\
  !*** ./src/app/tic-tac-toe/components/main/main.component.ts ***!
  \***************************************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_juego_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/juego.service */ "DT8M");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





function MainComponent_p_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("El ganador es el jugador ", ctx_r0.jugador, "");
} }
function MainComponent_p_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u00A1Empate! Reinicia el juego");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class MainComponent {
    constructor(jugarService) {
        this.jugarService = jugarService;
        this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
    }
    ngOnInit() {
        this.iniciarSubs();
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    iniciarSubs() {
        const subGanador = this.jugarService.hayGanador$.subscribe((resp) => {
            this.hayGanador = resp;
        });
        const subEmpate = this.jugarService.hayEmpate$.subscribe((resp) => {
            this.hayEmpate = resp;
        });
        const subMaquina = this.jugarService.vsMaquina$.subscribe((resp) => {
            this.vsMaquina = resp;
        });
        this.subs.add(subGanador);
        this.subs.add(subEmpate);
        this.subs.add(subMaquina);
    }
    reiniciar() {
        this.jugarService.reiniciar();
    }
    cambiarAdversario() {
        // this.contraMaquina = !this.contraMaquina;
        this.jugarService.vsMaquina$.next(!this.vsMaquina);
        this.jugarService.reiniciar();
    }
}
MainComponent.ɵfac = function MainComponent_Factory(t) { return new (t || MainComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_juego_service__WEBPACK_IMPORTED_MODULE_2__["JuegoService"])); };
MainComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MainComponent, selectors: [["app-main"]], decls: 9, vars: 2, consts: [[1, "container"], [4, "ngIf"], [3, "click"], ["type", "checkbox", "name", "vsMaquina", "id", "vsMaquina", 3, "change"]], template: function MainComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Tic Tac Toe ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, MainComponent_p_3_Template, 2, 1, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, MainComponent_p_4_Template, 2, 0, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainComponent_Template_button_click_5_listener() { return ctx.reiniciar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Reiniciar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function MainComponent_Template_input_change_7_listener() { return ctx.cambiarAdversario(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Jugar contra m\u00E1quina\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hayGanador);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hayEmpate);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], styles: [".container[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  height: 100vh;\r\n  background-color: black;\r\n  color: white;\r\n  font-family: \"Courier New\", Courier, monospace;\r\n  display: grid;\r\n  place-items: center;\r\n  overflow: hidden;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsV0FBVztFQUNYLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLDhDQUE4QztFQUM5QyxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJtYWluLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LWZhbWlseTogXCJDb3VyaWVyIE5ld1wiLCBDb3VyaWVyLCBtb25vc3BhY2U7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBwbGFjZS1pdGVtczogY2VudGVyO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map