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
    web3 = new Web3(
        Web3.givenProvider || environment.rpcUrlsTesnet

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
                /**********************************************************/
                /* Handle chain (network) and chainChanged (per EIP-1193) */
                /**********************************************************/

                const chainId = await ethereum.request({ method: 'eth_chainId' });
                this.handleChainChanged(chainId);
                ethereum.on('chainChanged', this.handleChainChanged);
                /***********************************************************/
                /* Handle user accounts and accountsChanged (per EIP-1193) */
                /***********************************************************/
                ethereum
                    .request({ method: 'eth_accounts' })
                    .then(this.handleAccountsChanged)
                    .catch((err) => {
                        // Some unexpected error.
                        // For backwards compatibility reasons, if no accounts are available,
                        // eth_accounts will return an empty array.
                        console.error(err);
                    });

                // Note that this event is emitted on page load.
                // If the array of accounts is non-empty, you're already
                // connected.
                ethereum.on('accountsChanged', this.handleAccountsChanged);

                // For now, 'eth_accounts' will continue to always return an array
                /*********************************************/
                /* Access the user's accounts (per EIP-1102) */
                /*********************************************/

                // You should only attempt to request the user's accounts in response to user
                // interaction, such as a button click.
                // Otherwise, you popup-spam the user like it's 1999.
                // If you fail to retrieve the user's account(s), you should encourage the user
                // to initiate the attempt.
                // While you are awaiting the call to eth_requestAccounts, you should disable
                // any buttons the user can click to initiate the request.
                // MetaMask will reject any additional requests while the first is still
                // pending.



            } else {
                console.log('Please install MetaMask!');
            }
        } catch (err) {
            log("error", err)
        }

    }

    async handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
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
                    console.log('Please connect to MetaMask.');
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
                console.log(`event conexion ${subscriptionId}`);
            })
            .on('data', async (event) => {
                try {
                    this.updateBalance(await this.getAccount())
                    this.transaction.emit(JSON.stringify(event.returnValues))
                } catch (err) {
                    console.log(err)
                }
            })
            .on('changed', function (event: any) {
                console.log('changed', event.transactionHash); // same results as the optional callback above
            })
            .on('error', function (error: any, receipt: any) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                console.log(error)
            });
    }
    handleChainChanged(_chainId) {
        // We recommend reloading the page, unless you must do otherwise
        // window.location.reload();
    }

    async getContract() {
        return new this.web3.eth.Contract(
            environment.ABI_USDT,
            environment.usdtTesnet
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
        console.log('capturar data', e)
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

        // if (accountsPermission) {
        // console.log(aa)
        // const { ok, data } = aa
        // if (ok) {

        //   _storage.agregar('token', data.token);
        //   _storage.agregar('address', address);
        //   _storage.agregar('menu', data.menu);
        //   this.router.navigate(['/dashboard']);
        //   this._alert.show(`Buenas Bienvenido`, {
        //     classname: 'bg-success text-light',
        //     delay: 800,
        //   });

        //         // } else {
        //         //   this.router.navigate(['/register/nuevo']);
        //         // }

        //         console.log('eth_accounts permission successfully requested!');
        //     }
        // })
        //     .catch (async (error: any) => {
        //     console.log("error", error)
        //     if (error?.message) {
        //         if (error.message.match('wallet_requestPermissions')) {
        //         }
        //         console.log(error.message);
        //     }
        //     if (error.error) {
        //         if (error.error.code === 998877)
        //             this.router.navigate(['/register/nuevo']);
        //     }
        //     if (error.code === 4001) {
        //         console.log('Permissions needed to continue.');
        //     }
        //         } catch (addError) {
        //             // handle "add" error
        //         }
        // const aa = await this._loginService.Validate(token);
        //   k      // console.log(token)
        // });
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
                params: [{ chainId: this.web3.utils.toHex(environment?.chainIdTestnet) }],
            });

            console.log(aa)

            await this.addUSDT()

        } catch (err: any) {
            if (err.code === 4902) {
                const data = [
                    // {
                    // chainId: web3.utils.toHex(environment.chainId),
                    // chainName: 'Binance Smart Chain',
                    // nativeCurrency: {
                    // name: 'BNB',
                    // symbol: 'BNB',
                    // decimals: 18,
                    // },
                    // rpcUrls: ['https://bsc-dataseed.binance.org/'],
                    // blockExplorerUrls: ['https://bscscan.com/'],
                    // },
                    {
                        chainId: this.web3.utils.toHex(environment.chainIdTestnet),
                        chainName: 'Smart Chain - Testnet',
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'BNB',
                            decimals: 18,
                        },
                        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                        blockExplorerUrls: ['https://testnet.bscscan.com'],
                    },

                ];
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: data,
                });


            }
        }
    }
    async addUSDT() {
        try {
            await ethereum
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
            await ethereum
                .request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: environment.contract_yaz,
                            symbol: 'osd',
                            decimals: 18,
                            image: 'https://image.shutterstock.com/image-vector/osd-letter-monogram-logo-design-260nw-1954215178.jpg',
                        },
                    },
                })
        } catch (err) {
            log('ho', err)

        }

    }
    async updateBalance(address) {
        const _Contract = await this.getContract()
        const balance = await _Contract.methods.balanceOf(address).call()
        this.balance = this.web3.utils.fromWei(balance, "ether")
        console.log('.................>>>>>', balance)

    }
}
