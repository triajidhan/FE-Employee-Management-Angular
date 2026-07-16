export class TableModel
{
    currentPage?: number;
    totalPage?: number;
    startData?: number;
    endData?: number;
    pagination?: number;
    totalData?: number;

    constructor()
    {
        this.currentPage = 1;
        this.totalPage = 1;
        this.startData = 1;
        this.endData = 20;
        this.pagination = 20;
    }
}
