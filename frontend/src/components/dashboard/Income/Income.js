import { Fade, Slide } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useCallback, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import DataTable from "react-data-table-component";
import "reactjs-popup/dist/index.css";
import useWindowDimensions from "../../../utils/getHeightWidth";
import Images from "../../../utils/images";
import { showError, showSuccess } from "../../../utils/showMessage";
import {
  delayTime,
  fadedelayTime,
  slideDirection,
} from "../../../utils/transitionEffectParams";

import {
  deleteIncome,
  getIncomeInstanceDetail,
  incomeList,
} from "../../../api/income";
import CustomModal from "../../common/CustomModal/CustomModal";
import CustomDelaySkeleton from "../../common/DelaySkeleton/CustomDelaySkeleton";
import ListHeading from "../../common/RDTListHeading/ListHeading";
import SubHeaderComponent from "../../common/RDTSubHeaderComponent/SubHeaderComponent";
import GeneralButton from "../../common/SaveButton/GeneralButton";
import ShowAlert from "../../common/ShowAlert/ShowAlert";
import "../../common/css/RDT_common.scss";
import AddIncomeInstance from "./AddIncome";
import EditIncomeInstance from "./EditIncome";
import "./Income.scss";

const ActionComponent = ({ setOpenAddIncome }) => {
  return (
    <Stack direction="row" spacing={2} className="py-3">
      <GeneralButton
        startIcon={
          <img src={Images.BlackPlus} alt="icon" id="center-blueShadow" />
        }
        onClickEvent={() => {
          {
            setOpenAddIncome((o) => !o);
          }
        }}
        className="me-1"
        value="Add Entry"
        variant="outlined"
        size="large"
        color="#000000"
      />
    </Stack>
  );
};

const Income = () => {
  const { width, height } = useWindowDimensions();
  let datatable_height = 490 + "px";
  const [incomeInstance, setIncomeInstance] = useState(null);
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [totalIncomeEntries, setTotalIncomeEntries] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [action, setAction] = React.useState("");
  const [openAddIncome, setOpenAddIncome] = useState(false);
  const [openEditIncome, setOpenEditIncome] = useState(false);
  const [instanceData, setInstanceData] = useState(null);
  const [deleteIncomeInstances, setDeleteIncomeInstances] = useState([]);
  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [openDeleteIncomeInstance, setOpenDeleteIncomeInstance] =
    useState(false);
  const pages_url = "dashboard/income";
  const [colCount, setColCount] = useState(null);
  const [pending, setPending] = useState(true);
  const [slideChecked, setSlideChecked] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(
    localStorage.getItem("rowsPerPage_IncomeList") !== null
      ? localStorage.getItem("rowsPerPage_IncomeList")
      : 5
  );

  useEffect(() => {
    setSlideChecked(true);
  }, []);

  const income_types = {
    miniorange: "miniOrange",
    freelance: "Freelance",
    dad: "Dad",
    invts_sold: "Invts Sold",
    refund: "Refund",
  };

  const systemUserColumns = [
    { label: "System User Id", value: "id" },
    { label: "Display Name", value: "system_display_username" },
    { label: "Username", value: "system_username" },
  ];
  const actionOptions = [{ label: "Delete", value: "delete" }];
  const getIncomeList = async () => {
    const { data, error } = await incomeList();
    if (data !== null) {
      setIncomeEntries(data.income);
      setTotalIncomeEntries(data.totalIncome);
    }
    setPending(false);
  };

  useEffect(() => {
    getIncomeList();
  }, []);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleAction = async () => {
    if (action === "delete") {
      handleDelete(null);
    }
  };
  const handleDelete = async (row) => {
    let temp = [];
    if (row) {
      temp = row;
    } else {
      temp = selectedRows;
    }
    setRowsToDelete(temp);
    let t = temp.map((object) => object.description);
    setDeleteIncomeInstances(t);
    setOpenDeleteIncomeInstance((o) => !o);
  };
  const handleDeleteAction = async () => {
    setLoadingDelete(true);
    let ids = rowsToDelete.map((item) => item.id);
    console.log("ids", ids);
    const { data, error } = await deleteIncome({ ids: ids });
    if (data !== null) {
      showSuccess(data.message);
      setIncomeInstance(Object.create(null));
      setOpenDeleteIncomeInstance((o) => !o);
    }
    if (error !== null) {
      showError(error);
    }
    getIncomeList();
    setSelectedRows([]);
    setToggleCleared(!toggleCleared);
    setLoadingDelete(false);
  };
  const handleSystemUserEdit = async (id) => {
    const { data, error } = await getIncomeInstanceDetail({
      id: id,
    });
    if (data !== null) {
      setIncomeInstance(data.instance);
      setOpenEditIncome((o) => !o);
    }
    if (error !== null) {
      showError(error);
    }
  };

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: "true",
    };
    const formattedDate = new Date(date).toDateString("en-US", options);
    const [weekday, month, day, year] = formattedDate.split(" ");
    const capitalizedMonth = month.toUpperCase();
    return `${day} ${capitalizedMonth} ${year}, ${weekday}`;
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      grow: 1,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => formatDate(new Date(row.date * 1000)),
      grow: 1,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => income_types[row.type],
      grow: 1,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      grow: 1,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      grow: 1,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Nav>
            <NavDropdown
              id="nav-dropdown-systemuser"
              title={
                loadingEdit && row.id == rowToEdit ? (
                  <img src={Images.Loader} width="26px" height="26px" />
                ) : (
                  <img src={Images.ThreeDotIcon} alt="action" />
                )
              }
              menuVariant="primary"
              disabled={loadingEdit}
            >
              <NavDropdown.Item onClick={() => handleSystemUserEdit(row.id)}>
                Edit
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={async () => {
                  handleDelete([row]);
                }}
              >
                Delete
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </>
      ),
      middle: true,
      minWidth: "50px",
    },
  ];
  return (
    <>
      <Slide timeout={delayTime} direction={slideDirection} in={slideChecked}>
        <div>
          <Fade timeout={fadedelayTime} in={slideChecked}>
            <div className="right_side_container">
              <div className="main_content_container mx-auto w-100">
                <CustomModal
                  width={"35%"}
                  open={openAddIncome}
                  handleClose={() => {
                    setOpenAddIncome((o) => !o);
                  }}
                >
                  <AddIncomeInstance
                    getIncomeList={getIncomeList}
                    setOpenAddIncome={setOpenAddIncome}
                    setIncomeInstance={setIncomeInstance}
                  />
                </CustomModal>
                <CustomModal
                  open={openEditIncome}
                  handleClose={() => {
                    setOpenEditIncome((o) => !o);
                  }}
                >
                  <EditIncomeInstance
                    getIncomeList={getIncomeList}
                    setOpenEditIncome={setOpenEditIncome}
                    incomeInstance={incomeInstance}
                    setIncomeInstance={setIncomeInstance}
                  />
                </CustomModal>
                <CustomModal
                  width={"35%"}
                  open={openDeleteIncomeInstance}
                  handleClose={() => {
                    setOpenDeleteIncomeInstance((o) => !o);
                  }}
                >
                  <ShowAlert
                    setOpenAlert={setOpenDeleteIncomeInstance}
                    handleAlertAction={handleDeleteAction}
                    colName={deleteIncomeInstances}
                    alertMsg="Below entries will be deleted :"
                    headingMsg="Delete Entries"
                    loading={loadingDelete}
                  />
                </CustomModal>
                <div
                  className="position-relative bg-white"
                  style={{ height: `${datatable_height}` }}
                >
                  <DataTable
                    title={
                      <ListHeading
                        dataTableHeadingText="Income Overview"
                        dataTableHeadingIcon={Images.SystemUserHeadingIcon}
                      />
                    }
                    columns={columns}
                    data={incomeEntries}
                    className="rdt_container"
                    progressPending={false}
                    progressComponent={
                      <CustomDelaySkeleton
                        rowsPerPage={rowsPerPage}
                        colCount={colCount}
                        totalColumns={5}
                      />
                    }
                    fixedHeader
                    paginationPerPage={rowsPerPage}
                    paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                    pagination
                    paginationServer
                    paginationTotalRows={totalIncomeEntries}
                    selectableRows
                    selectableRowsVisibleOnly
                    selectableRowsHighlight
                    highlightOnHover
                    onChangeRowsPerPage="{handlePerRowsChange}"
                    onChangePage="{handlePageChange}"
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleCleared}
                    actions={
                      <ActionComponent setOpenAddIncome={setOpenAddIncome} />
                    }
                    subHeader
                    subHeaderComponent={
                      <SubHeaderComponent
                        placeholder="an entry"
                        filterBy=""
                        action={action}
                        setAction={setAction}
                        setFilterBy=""
                        handleAction={handleAction}
                        filterOptions={systemUserColumns}
                        actionOptions={actionOptions}
                        search=""
                        setSearch=""
                        handleSearch=""
                        selectedRows={selectedRows}
                        pages_url={pages_url}
                        checkedStateDict=""
                        setCheckedStateDict=""
                      />
                    }
                    subHeaderAlign="center"
                    paginationIconFirstPage={
                      <img src={Images.FirstPageIcon} alt="first page" />
                    }
                    paginationIconLastPage={
                      <img src={Images.LastPageIcon} alt="last page" />
                    }
                    paginationIconNext={
                      <img src={Images.NextPageIcon} alt="next" />
                    }
                    paginationIconPrevious={
                      <img src={Images.PreviousPageIcon} alt="previous" />
                    }
                  />
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </Slide>
    </>
  );
};

export default Income;
