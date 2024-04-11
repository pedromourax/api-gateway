import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";


@Injectable()
export class ClientProxySmartRanking {

    getClientProxyAdminBackend(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://user:gVndBrn6v6B+@54.160.160.41:5672/smartranking'],
                queue: 'admin-backend',
            }
        }
        )
    }

}