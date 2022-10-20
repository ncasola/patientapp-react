import moment from "moment";

const dateToHuman = (date) => {
    return moment(date).format("DD/MM/YYYY HH:mm");
}

const dateToSql = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

export { dateToHuman, dateToSql };
