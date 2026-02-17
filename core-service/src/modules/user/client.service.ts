import { ClientRepository } from "../infrastructure/user.repository";
import { CreateClientDto, UpdateClientDto } from "./client.schemas";

export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository, 
    ) {}

  addClient(dto: CreateClientDto) {
    return this.clientRepository.create(dto);
  }  

  converFromLead(leadId: string, ownerId: string): CreateClientDto {
    return {
      ownerId: ownerId,
      leadId: leadId,
      companyName: 'null',
      industry: 'null',
      contactName: 'null',//temporal mock
      contactEmail: 'null@example.com',// also temporal mock
    }
  }
  
  getClientById(id: string) {   
    return this.clientRepository.findById(id);
  }

  updateClient(id: string, dto: UpdateClientDto) {
    return this.clientRepository.update(id, dto);
  }

  remove(id: string) {
    return this.clientRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.clientRepository.findByEmail(email);
  }

  findActiveById(id: string) {
    return this.clientRepository.findActiveById(id);
  }

  listPaginated(limit = 20, offset = 0) {
    return this.clientRepository.listPaginated(limit, offset);
  }
}
