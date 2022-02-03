import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from '@environments/environment.hmr';
import Web3 from 'web3';
import { eth_sign, _storage } from '@utils/index'
import { Router } from '@angular/router';
const { log, error, warn } = console
declare const window: any;
const { ethereum } = window;
@Injectable({
    providedIn: 'root',
})
export class Web3Service {
    @Output() public transaction = new EventEmitter();
    // @Output() transaction: EventEmitter<any> = new EventEmitter();
    public address: any
    public socketTransaction: any
    public web3 = new Web3(
        Web3.givenProvider || environment.BINANCE.rpcUrls[0]

    );
    currentAccount: any
    public balance: any;
    constructor(private router: Router) {
        this._init = this._init.bind(this)
        this._init()
    }
    async _init() {
        try {
            if (!!ethereum && !!localStorage.getItem('token')) {
                this.startApp(ethereum); // Initialize your app
                this.selectRed()
                const chainId = await ethereum.request({ method: 'eth_chainId' });
                this.handleChainChanged(chainId);
                ethereum.on('chainChanged', this.handleChainChanged);
                ethereum
                    .request({ method: 'eth_accounts' })
                    .then(this.handleAccountsChanged)
                    .catch((err) => {
                        console.error('hola');
                    });

                ethereum.on('accountsChanged', this.handleAccountsChanged);


            } else {
                // _('Please install MetaMask!');
            }
        } catch (err) {
            console.error(err)
            // log("error", err)
        }

    }

    async handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            // _('Please connect to MetaMask.');
        } else if (accounts[0] !== this.currentAccount) {
            this.currentAccount = accounts[0];
            ethereum.request({ method: 'eth_chainId' }).then(resp => {
                if (this.web3.utils.toHex(97) !== resp) {
                    this.selectRed()
                }
            })
            ethereum.on('chainChanged', (resp) => {
                if (this.web3.utils.toHex(97) !== resp) {
                    this.selectRed()
                }
            });

            // Do any other work!
        }
    }
    connect() {
        ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(this.handleAccountsChanged)
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    // _('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
    }


    async conexionTransaction() {
        let _osedhelu = await this.getContract()
        this.socketTransaction = await _osedhelu.events.Transfer({
            filter: {
                _from: await this.getAccount()
            },
            fromBlock: 'latest'
        }, function (error: any, event: any) {
        })
            .on("connected", function (subscriptionId: any) {
            })
            .on('data', async (event) => {
                try {
                    this.updateBalance(await this.getAccount())
                    this.transaction.emit(JSON.stringify(event.returnValues))
                } catch (err) {
                    console.error(err)
                }
            })
            .on('changed', function (event: any) {
                // _('changed', event.transactionHash); // same results as the optional callback above
            })
            .on('error', function (error: any, receipt: any) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                // _(error)
            });
    }
    handleChainChanged(_chainId) {
        // We recommend reloading the page, unless you must do otherwise
        // window.location.reload();
    }

    async getContract() {
        return new this.web3.eth.Contract(
            environment.ABI_USDT,
            environment.usdtTesnet,
            { from: environment.wallet1, gas: 80400 }
        )
    }
    startApp(provider) {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        }
        // Access the decentralized web!
    }
    emotEvent(e) {
        // _('capturar data', e)
    }
    isConnected() {
        return ethereum.isConnected()
    }
    async getAccount(): Promise<string> {
        return (await ethereum.request({ method: 'eth_requestAccounts' }))[0]
    }
    async selectAccount() {
        return await ethereum
            .request({
                method: 'wallet_requestPermissions',
                params: [{ eth_accounts: {} }],
            })

    }
    async getToken(address: string) {
        return await eth_sign(
            (msg: any) =>
                this.web3.eth.personal.sign(msg, address, 'login'),
            '1d',
            {
                address: await this.getAccount()
            }
        );
    }
    async selectRed() {
        try {

            const aa = await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: environment.BINANCE.chainId }],
            });

            await this.addUSDT()

        } catch (err: any) {
            if (err.code === 4902) {
                // const data = ;
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        environment.BINANCE
                    ],
                });


            }
        }
    }
    addUSDT() {

        if (!localStorage.getItem('TOKEN_USDT')) {
            ethereum
                .request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: environment.usdtTesnet,
                            symbol: 'USDT',
                            decimals: 18,
                            image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
                        },
                    },
                })
                .then((success) => {
                    if (success) {
                        localStorage.setItem('TOKEN_USDT', 'true')
                        // _('USDT successfully added to wallet!');
                    } else {
                        throw new Error('Something went wrong.');
                    }
                })
                .catch(console.error);
        }
        if (!localStorage.getItem('TOKEN_YAZ1')) {
            ethereum
                .request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: environment.contract_yaz,
                            symbol: 'YAZ',
                            decimals: 18,
                            image: 'https://presale.yafuzgame.com/public/icon/logo.svg',
                        },
                    },
                }).then((success) => {
                    if (success) {
                        localStorage.setItem('TOKEN_YAZ1', 'true')
                        // _('add token YAZ')
                    } else {
                        throw new Error('Something went wrong.');
                    }
                })
                .catch(console.error);
        }
    }
    async updateBalance(address) {
        const _Contract = await this.getContract()
        const balance = await _Contract.methods.balanceOf(address).call()
        this.balance = this.web3.utils.fromWei(balance, "ether")
        // _('.................>>>>>', balance)

    }
}
