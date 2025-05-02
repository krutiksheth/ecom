import {Box, Pagination, Typography} from "@mui/material";
import {Pagination as PaginationType} from "../models/pagination.ts";

type Props = {
    pagination: PaginationType;
    onPageChange: (page: number) => void;
}

const AppPagination = ({pagination, onPageChange}: Props) => {

    const {totalCount, totalPages, currentPage, pageSize} = pagination;
    const startItem = ((currentPage-1) * pageSize)+1;
    const endItem = Math.min(currentPage*pageSize, totalCount);

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={3}>
            <Typography>
                Displaying {startItem}-{endItem} of {totalCount} items
            </Typography>
            <Pagination
                onChange={(_,page: number) => onPageChange(page)}
                color="secondary"
                size="large"
                page={currentPage}
                count={totalPages}/>
        </Box>
    );
};

export default AppPagination;
