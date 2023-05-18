import { type HistoryDTO } from '../dto/history.dto';
import HistoryModel, { type HistoryEntity } from '../entities/history.entity';
import { type Paginate } from '../interfaces';

export class HistoryService {
    async findByEmail(email: string): Promise<HistoryEntity | null> {
        const history = await HistoryModel.findOne({ email });
        return history;
    }

    async createHistory(body: HistoryDTO): Promise<HistoryEntity> {
        const history = await new HistoryModel(body).save();

        return history;
    }

    async getHistories(
        query: Paginate,
        body: HistoryDTO
    ): Promise<HistoryEntity> {
        const histories = await HistoryModel.find(body)
            .limit(query.rowsPerPage)
            .skip(query.page);
        const historiesDB = histories as unknown as HistoryEntity;

        return historiesDB;
    }
}
