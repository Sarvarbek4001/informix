import * as React from "react";
import "./customer.scss";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import swal from "sweetalert";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { label: "First Name" },
  { label: "Last Name" },
  { label: "Email" },
  { label: "Created Customer" },
  { label: "Updated Customer" },
  { label: "Is Connected" },
  { label: "Employee" },
  { label: "Tools" },
];

const bodyContent = [
  "first_name",
  "last_name",
  "user_email",
  "created_at",
  "updated_at",
  "is_connected",
  "admin_id",
  "tools",
];

export default function Customers(props) {
  const [data, setData] = React.useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  const removeHandler = async (userId) => {
    try {
      props.setIsLoading(true);
      const url = `${process.env.REACT_APP_HOST}/users`;
      const resData = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      });
      if (resData.ok) {
        props.setIsLoading(false);
      }
    } catch (error) {
      console.log("error" + error);
    }
  };

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_HOST}/users`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const json = await response.json();

      const recieveData = json.map((data) => {
        return {
          user_id: data.user_id,
          first_name: data.first_name,
          last_name: data.last_name,
          user_email: data.user_email,
          phone_number: data.phone_number,
          created_at: data.created_at,
          updated_at: data.updated_at,
          is_connected:
            data.is_connected === true ? (
              <p>
                <i className="bi bi-telephone-plus-fill"></i>
              </p>
            ) : (
              <p>
                <i className="bi bi-telephone-x-fill"></i>
              </p>
            ),
          admin_id: data.admin_id,
          tools: (
            <div className="table__btn">
              <button
                className="table__btn-save"
                onClick={() => props.onShowCart(data)}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                className="table__btn-delete"
                onClick={async () => {
                  const responseReceived = await swal({
                    text: "Are you sure,you want to remove this user?",
                    icon: "warning",
                    buttons: {
                      cancel: true,
                      confirm: true,
                    },
                  });
                  if (responseReceived) {
                    removeHandler(data.user_id);
                  }
                }}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ),
        };
      });
      setData(recieveData);
    } catch (error) {
      console.log("error", error);
    }
  };
  React.useEffect(() => {
    if (props.isLoading || isFirstTime) {
      setIsFirstTime(false);
      fetchData();
    }
  }, [props.isLoading]);

  return (
    <div className="inner__container">
      {props.isLoading === true ? (
        "Loading"
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 650 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      style={{
                        minWidth: column.minWidth,
                        fontSize: "1.4rem",
                        backgroundColor: "#f0f4c3",
                        color: "black",
                        textAlign: "start",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {bodyContent.map((column, index) => {
                          const value = row[column];
                          return (
                            <TableCell
                              key={index}
                              sx={{
                                fontSize: "1.3rem",
                                padding: "1rem",
                                color: "black",
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          sx={{ fontSize: "1.1rem" }}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        </Paper>
      )}
    </div>
  );
}
