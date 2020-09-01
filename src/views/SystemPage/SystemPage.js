import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";

import styles from "../../assets/jss/material-kit-react/views/systemPage.js";
import { getSystem } from "../../api/system/index";
import {
  Card,
  Icon,
  FormControl,
  InputLabel,
  NativeSelect,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import CardBody from "../../components/Card/CardBody";
import imageServer from "../../assets/img/server.png";
import imageBd from "../../assets/img/bd.png";
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';

const useStyles = makeStyles(styles);

export default function SystemPage() {
  const classes = useStyles();
  const [servers, setServers] = useState([]);
  const [serverFilter, setServerFilter] = useState([]);
  const [serverFiltered, setServerFiltered] = useState([]);
  const [camadaServer, setCamadaServer] = useState("Todos");
  const [statusServer, setStatusServer] = useState("Todos");
  const [nomeServer, setNomeServer] = useState("");

  const getServers = async () => {
    const serversBd = await getSystem();

    const uniqueCamadas = [
      ...new Set(
        serversBd.map((item) => {
          return item.camada.title;
        })
      ),
    ];

    setServers(serversBd);
    setServerFilter(uniqueCamadas);
    setServerFiltered(serversBd);
  };

  useEffect(() => {
    getServers();
  }, []);

  const handleCamada = (e) => {
    let value = e.target.value;
    let filteredData = servers.filter((item) => {
      let conditionCamada = item.camada.title.includes(value);
      let conditionStatusServer = item.overhead === statusServer;
      let conditionNameServer = item.nome
        .toLowerCase()
        .includes(nomeServer.toLowerCase());

      if (
        (value === "Todos" || conditionCamada) &&
        (statusServer === "Todos" || conditionStatusServer) &&
        (nomeServer === "" || conditionNameServer)
      ) {
        return true;
      } else return null;
    });

    setServerFiltered(filteredData);
    setCamadaServer(value);
  };

  const handleStatus = (e) => {
    let value = e.target.value === "true" ? true : false;
    //console.log(value);
    let filteredData = servers.filter((item) => {
      let conditionCamada = item.camada.title.includes(camadaServer);
      let conditionStatusServer = item.overhead === value;
      let conditionNameServer = item.nome
        .toLowerCase()
        .includes(nomeServer.toLowerCase());
      // console.log(conditionStatusServer);

      if (
        (e.target.value === "Todos" || conditionStatusServer) &&
        (camadaServer === "Todos" || conditionCamada) &&
        (nomeServer === "" || conditionNameServer)
      ) {
        return true;
      } else return null;
    });

    setServerFiltered(filteredData);
    setStatusServer(value);
  };

  const handleNomeServer = (e) => {
    let value = e.target.value;
    let filteredData = servers.filter((item) => {
      let conditionCamada = item.camada.title.includes(camadaServer);
      let conditionStatusServer = item.overhead === statusServer;
      let conditionNameServer = item.nome
        .toLowerCase()
        .includes(value.toLowerCase());

      if (
        (value === "" || conditionNameServer) &&
        (statusServer === "Todos" || conditionStatusServer) &&
        (camadaServer === "Todos" || conditionCamada)
      ) {
        return true;
      } else return null;
    });

    setServerFiltered(filteredData);
    setNomeServer(value);
  };

  return (
    <div>
      <GridContainer>
        <div className={classes.flexStart}>
          <div className={classes.itemTitle}>
            <h3>Arquitetura do Sistema</h3>
            <h5>Servidores</h5>
          </div>
          <div className={classes.itemFilter}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="camadas-native">Camadas</InputLabel>
              <NativeSelect
                defaultValue="Todos"
                inputProps={{
                  name: "Camadas",
                  id: "camadas-native",
                }}
                onChange={handleCamada}
              >
                <option key={`camada`} value="Todos">
                  Todos
                </option>
                {serverFilter.map((prop, key) => {
                  return (
                    <option key={`camada${key}`} value={prop}>
                      {prop}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
            <span>{"  "}</span>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="status-native">Status</InputLabel>
              <NativeSelect
                defaultValue="Todos"
                inputProps={{
                  name: "Status",
                  id: "status-native",
                }}
                onChange={handleStatus}
              >
                <option key={`status`} value="Todos">
                  Todos
                </option>
                <option key={`statusTrue`} value="true">
                  Ativos
                </option>
                <option key={`statusFalse`} value="false">
                  Inativos
                </option>
              </NativeSelect>
            </FormControl>
            <FormControl className={classes.formControl} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                value={nomeServer}
                onChange={handleNomeServer}
                startAdornment={
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                }
                inputProps={{
                  name: "nome-server",
                  id: "nome-native",
                }}
                labelWidth={0}
              />
            </FormControl>
          </div>
        </div>
      </GridContainer>
      <GridContainer>
        {serverFiltered.map((prop, key) => {
          let corIcon = prop.overhead === true ? "#004691" : "#B00020";
          let typeIcon =
            prop.camada.title === "Aplicação"
              ? <SettingsApplicationsOutlinedIcon className={classes.iconServer} />
              : prop.camada.title === "Banco de Dados"
              ? <img
                  src={imageBd}
                  alt="BD"
                  height="20"
                  width="18"
                  style={{marginLeft:"5px"}}
                />
              : <PublicOutlinedIcon className={classes.iconServer}  />;
          return (
            <GridItem xs={12} sm={4} md={3} key={`gridServer${key}`}>
              <Card>
                <CardBody>
                  <div className={classes.serverCss}>
                    <img
                      src={imageServer}
                      alt="User Profile"
                      height="95"
                      width="83"
                    />
                    {/* <span
                        className={classes.avatarStatusOnline}
                        // } avatar-status-lg`}
                      ></span> */}
                    <span
                      style={{ backgroundColor: corIcon }}
                      className={classes.serverCamadas}
                    >
                      {typeIcon}
                    </span>
                  </div>
                  <div className={classes.dataServerCss}>
                    <div display="flex">
                      <div>{prop.camada.title}</div>
                      <div>
                        <strong>{prop.nome}</strong>
                      </div>
                      <div>
                        CPU: <strong>{prop.CPU}</strong>
                      </div>
                      <div>
                        Memória: <strong>{prop.MEMORIA}</strong>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <br />
            </GridItem>
          );
        })}
      </GridContainer>
    </div>
  );
}
