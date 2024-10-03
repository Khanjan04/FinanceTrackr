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
  bankAccountList,
  deleteBankAccount,
  getBankAccountInstanceDetail,
} from "../../../api/bankAccount";
import CustomModal from "../../common/CustomModal/CustomModal";
import CustomDelaySkeleton from "../../common/DelaySkeleton/CustomDelaySkeleton";
import ListHeading from "../../common/RDTListHeading/ListHeading";
import SubHeaderComponent from "../../common/RDTSubHeaderComponent/SubHeaderComponent";
import GeneralButton from "../../common/SaveButton/GeneralButton";
import ShowAlert from "../../common/ShowAlert/ShowAlert";
import "../../common/css/RDT_common.scss";
import AddBankAccountInstance from "./AddBankAccount";
import "./BankAccount.scss";
import EditBankAccountInstance from "./EditBankAccount";

const ActionComponent = ({ setOpenAddBankAccount }) => {
  return (
    <Stack direction="row" spacing={2} className="py-3">
      <GeneralButton
        startIcon={
          <img src={Images.BlackPlus} alt="icon" id="center-blueShadow" />
        }
        onClickEvent={() => {
          {
            setOpenAddBankAccount((o) => !o);
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

const BankAccount = () => {
  const { width, height } = useWindowDimensions();
  let datatable_height = 490 + "px";
  const [bankAccountInstance, setBankAccountInstance] = useState(null);
  const [bankAccountEntries, setBankAccountEntries] = useState([]);
  const [totalBankAccountEntries, setTotalBankAccountEntries] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [action, setAction] = React.useState("");
  const [openAddBankAccount, setOpenAddBankAccount] = useState(false);
  const [openEditBankAccount, setOpenEditBankAccount] = useState(false);
  const [instanceData, setInstanceData] = useState(null);
  const [deleteBankAccountInstances, setDeleteBankAccountInstances] = useState(
    []
  );
  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [openDeleteBankAccountInstance, setOpenDeleteBankAccountInstance] =
    useState(false);
  const pages_url = "dashboard/bankAccount";
  const [colCount, setColCount] = useState(null);
  const [pending, setPending] = useState(true);
  const [slideChecked, setSlideChecked] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(
    localStorage.getItem("rowsPerPage_BankAccountList") !== null
      ? localStorage.getItem("rowsPerPage_BankAccountList")
      : 5
  );

  useEffect(() => {
    setSlideChecked(true);
  }, []);

  const bankAccount_types = {
    hdfc: "HDFC",
    sbi: "SBI",
    icici: "ICICI",
  };

  const systemUserColumns = [
    { label: "System User Id", value: "id" },
    { label: "Display Name", value: "system_display_username" },
    { label: "Username", value: "system_username" },
  ];
  const actionOptions = [{ label: "Delete", value: "delete" }];
  const getBankAccountList = async () => {
    const { data, error } = await bankAccountList();
    console.log(error);
    if (data !== null) {
      setBankAccountEntries(data.bankAccount);
      setTotalBankAccountEntries(data.totalBankAccount);
    }
    setPending(false);
  };

  useEffect(() => {
    getBankAccountList();
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
    setDeleteBankAccountInstances(t);
    setOpenDeleteBankAccountInstance((o) => !o);
  };
  const handleDeleteAction = async () => {
    setLoadingDelete(true);
    let ids = rowsToDelete.map((item) => item.id);
    console.log("ids", ids);
    const { data, error } = await deleteBankAccount({ ids: ids });
    if (data !== null) {
      showSuccess(data.message);
      setBankAccountInstance(Object.create(null));
      setOpenDeleteBankAccountInstance((o) => !o);
    }
    if (error !== null) {
      showError(error);
    }
    getBankAccountList();
    setSelectedRows([]);
    setToggleCleared(!toggleCleared);
    setLoadingDelete(false);
  };
  const handleSystemUserEdit = async (id) => {
    const { data, error } = await getBankAccountInstanceDetail({
      id: id,
    });
    if (data !== null) {
      setBankAccountInstance(data.instance);
      setOpenEditBankAccount((o) => !o);
    }
    if (error !== null) {
      showError(error);
    }
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      grow: 1,
      sortable: true,
    },
    {
      name: "Bank",
      selector: (row) => bankAccount_types[row.bank],
      grow: 1,
      sortable: true,
    },
    {
      name: "Display Name",
      selector: (row) => row.displayName,
      grow: 1,
      sortable: true,
    },
    {
      name: "Account No",
      selector: (row) => row.accountNo,
      grow: 1,
      sortable: true,
    },
    {
      name: "IFS Code",
      selector: (row) => row.ifscode,
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
                  width={"38%"}
                  open={openAddBankAccount}
                  handleClose={() => {
                    setOpenAddBankAccount((o) => !o);
                  }}
                >
                  <AddBankAccountInstance
                    getBankAccountList={getBankAccountList}
                    setOpenAddBankAccount={setOpenAddBankAccount}
                    setBankAccountInstance={setBankAccountInstance}
                  />
                </CustomModal>
                <CustomModal
                  open={openEditBankAccount}
                  handleClose={() => {
                    setOpenEditBankAccount((o) => !o);
                  }}
                >
                  <EditBankAccountInstance
                    getBankAccountList={getBankAccountList}
                    setOpenEditBankAccount={setOpenEditBankAccount}
                    bankAccountInstance={bankAccountInstance}
                    setBankAccountInstance={setBankAccountInstance}
                  />
                </CustomModal>
                <CustomModal
                  width={"38%"}
                  open={openDeleteBankAccountInstance}
                  handleClose={() => {
                    setOpenDeleteBankAccountInstance((o) => !o);
                  }}
                >
                  <ShowAlert
                    setOpenAlert={setOpenDeleteBankAccountInstance}
                    handleAlertAction={handleDeleteAction}
                    colName={deleteBankAccountInstances}
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
                        dataTableHeadingText="Bank Account Overview"
                        dataTableHeadingIcon={Images.SystemUserHeadingIcon}
                      />
                    }
                    columns={columns}
                    data={bankAccountEntries}
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
                    paginationTotalRows={totalBankAccountEntries}
                    selectableRows
                    selectableRowsVisibleOnly
                    selectableRowsHighlight
                    highlightOnHover
                    onChangeRowsPerPage="{handlePerRowsChange}"
                    onChangePage="{handlePageChange}"
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleCleared}
                    actions={
                      <ActionComponent
                        setOpenAddBankAccount={setOpenAddBankAccount}
                      />
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

export default BankAccount;
