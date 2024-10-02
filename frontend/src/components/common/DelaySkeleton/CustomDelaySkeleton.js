import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const CustomDelaySkeleton = ({ colCount, rowsPerPage, totalColumns }) => {
  return (
    <Box className="pt-5 w-100">
      {[...Array(parseInt(rowsPerPage))].map((_, i) => {
        return (
          <div className="d-flex py-3">
            <Skeleton
              animation="wave"
              variant="rounded"
              width={15}
              height={15}
              className="mx-5"
            />
            {[...Array(totalColumns - colCount)].map((_, i) => {
              return (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{
                    width: 100 / (totalColumns - colCount) + "%",
                    height: 15,
                  }}
                  className="me-3"
                />
              );
            })}
            <Skeleton
              animation="wave"
              variant="circular"
              width={15}
              height={15}
              className="mx-5"
            />
          </div>
        );
      })}
    </Box>
  );
};

export default CustomDelaySkeleton;
