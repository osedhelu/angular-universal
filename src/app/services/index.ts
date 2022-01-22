import { Web3Service } from "@services/web3Service/web3.service"
import { AlertService } from "@services/alertService/alert.service"
import { PaisesService } from "./PaisesService/paises.service"
import { UsersService } from "./UsersService/Users.service"
import { PackagesService } from "./PackagesService/packages.service"
import { AuthService } from "./auth.service"
import { AuthGuard } from "./guard/auth.guard"
import { TransactionService } from "./transaction/transaction.service"
import { MetamaskGuard } from "./guard/authMetamask.guard"
import { SocketService } from "./SocketService/socket.service"

export const providers = [
    Web3Service,
    AlertService,
    PaisesService,
    UsersService,
    PackagesService,
    AuthService,
    AuthGuard,
    TransactionService,
    MetamaskGuard,
    SocketService
]