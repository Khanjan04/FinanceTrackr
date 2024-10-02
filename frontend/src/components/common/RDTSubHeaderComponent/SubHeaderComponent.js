import { IconButton } from "@mui/material";
import MuiButton from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import advance_click from "../../../images/advance_click.svg";
import advance_non_click from "../../../images/advance_non_click.svg";
import SearchIcon from "../../../images/search.svg";
import "./SubHeaderComponent.scss";

import { CustomizeColumn } from "../CustomColumn/customize_column";

const SubHeaderComponent = ({
  search_disabled,
  actions,
  selectedRows,
  placeholder,
  search,
  handleSearch,
  setSearch,
  action,
  filterBy,
  advancefilterBy,
  setAction,
  setFilterBy,
  handleAction,
  filterOptions,
  actionOptions,
  pages_url,
  advanceSearchToggle,
  setAdvanceSearchToggle,
  setAdvancefilterBy,
  showAdvance,
  showTicketAdvanceFilter,
  perPage,
  from,
  setFrom,
  to,
  setTo,
  checkedStateDict,
  setCheckedStateDict,
  all_fields,
  report_type,
  getData,
  setAdvancedQuery,
  addedQuery,
  asset,
  assets,
  setAsset,
  handleAssetWebAppChange,
  download_report,
  selectPage,
  setPageType,
  pageType,
  disable_buttons,
}) => {
  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
  };
  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  useEffect(() => {
    if (actionOptions) {
      setAction(actionOptions[0].value);
    }
  }, []);

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      fontWeight: 700,
      lineHeight: "21px",
      fontStyle: "normal",
      padding: "10px 26px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: ['"DM Sans"'].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));
  const BootstrapInputBorderRadius = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      borderRadius: "4px 0 0 4px",
      fontSize: 16,
      fontWeight: 700,
      lineHeight: "21px",
      fontStyle: "normal",
      padding: "10px 26px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: ['"DM Sans"'].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));

  const ApplyButton = styled(MuiButton)({
    textTransform: "none",
    fontSize: 14,
    fontWeight: 700,
    padding: "11px 22px",
    border: "0",
    lineHeight: "21px",
    backgroundColor: "#2D3748",
    borderRadius: "0 4px 4px 0",
    color: "#FFFFFF",
    fontFamily: ['"DM Sans"'].join(","),
    "&:hover": {
      backgroundColor: "#2D3748",
      boxShadow: "none",
    },
  });

  const TicketAdvancefilters = [
    { label: "Show Approved", value: "APPROVED" },
    { label: "Show Rejected", value: "DENIED" },
    { label: "Show Pending", value: "PENDING" },
  ];

  return (
    <>
      <div className="d-flex align-items-center w-100 pt-1 rdt_subheader_menu">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          id="search_field_id"
          className="search_field"
          onSubmit={handleSearch}
        >
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <img
              src={SearchIcon}
              alt="icon"
              id="center-blueShadow"
              onClick={handleSearch}
            />
          </IconButton>
          <InputBase
            disabled={search_disabled ? true : false}
            sx={{ ml: 1, flex: 1 }}
            placeholder={`search for ${placeholder}`}
            className="search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            inputProps={{ "aria-label": `search for ${placeholder}` }}
          />
        </Paper>

        <div className="d-flex flex-grow-1 justify-content-between align-items-center">
          <FormControl sx={{ m: 1 }} variant="standard">
            <Select
              labelId="demo-customized-select-label"
              id="select_filter_by"
              value={filterBy}
              onChange={handleFilterByChange}
              displayEmpty
              input={<BootstrapInput />}
            >
              <MenuItem value={report_type ? "all" : ""}>
                <em className="select_options">All</em>
              </MenuItem>
              {filterOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  className="select_options"
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="d-flex flex-grow-1 justify-content-end align-items-center">
            {selectPage && (
              <FormControl sx={{ m: 1 }} variant="standard">
                <Select
                  value={pageType}
                  className="select_options_css"
                  onChange={(event) => setPageType(event.target.value)}
                  input={<BootstrapInput />}
                >
                  {selectPage.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      className="select_options"
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {actionOptions && (
              <div className="d-flex flex-grow-1 justify-content-end align-items-center pe-3">
                <div className="pe-3">{actions}</div>
                <FormControl variant="standard" sx={{ my: 1 }}>
                  <Select
                    labelId="select-label"
                    id="select_action"
                    className="select_action_class"
                    value={action}
                    onChange={handleActionChange}
                    input={<BootstrapInputBorderRadius />}
                  >
                    {actionOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        className="select_options"
                        disabled={
                          selectedRows.length > 0 ||
                          pages_url === "dashboard/network_scan_results"
                            ? false
                            : true
                        }
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <ApplyButton
                  className={
                    selectedRows.length > 0 && action !== ""
                      ? "apply-button active_button_blue"
                      : "apply-button dactive_button_black"
                  }
                  varient="outlined"
                  size="large"
                  sx={{ my: 1 }}
                  onClick={() => handleAction()}
                  disabled={
                    selectedRows.length > 0 && action !== "" ? false : true
                  }
                >
                  Apply
                </ApplyButton>
              </div>
            )}
            {showTicketAdvanceFilter && (
              <FormControl variant="standard">
                <Select
                  labelId="demo-customized-select-label"
                  id="select_filter_by"
                  value={advancefilterBy}
                  onChange={(event) => setAdvancefilterBy(event.target.value)}
                  displayEmpty
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em className="select_options">Show All</em>
                  </MenuItem>
                  {TicketAdvancefilters.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      className="select_options"
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {checkedStateDict && (
              <CustomizeColumn
                page_url={pages_url}
                checkedStateDict={checkedStateDict}
                setCheckedStateDict={setCheckedStateDict}
              />
            )}
            {showAdvance && (
              <div className="d-flex algn-items-center">
                <button
                  onClick={() => {
                    setAdvanceSearchToggle((o) => !o);
                  }}
                  className="advance_filter_button"
                  id="image"
                >
                  <img
                    id="advance-svg"
                    src={
                      advanceSearchToggle ? advance_click : advance_non_click
                    }
                    alt="advance_filter"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubHeaderComponent;
