import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {useFormik} from 'formik';
import * as Yup from "yup";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import {useHistory} from "react-router";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {EntityStatus} from "../../../../graphql/users.type";

const useFormStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         // backgroundColor: 'blue',
         height: '50%',
         width: '100%',
         '& > *': {
            margin: theme.spacing(1),
            // width: 200,
         },
      },
   }),
);

const useSelectFormStyles = makeStyles((theme: Theme) =>
   createStyles({
      formControl: {
         margin: theme.spacing(1),
         minWidth: 120,
      },
      selectEmpty: {
         marginTop: theme.spacing(2),
      },
   }),
);

const useButtonStyles = makeStyles(theme => ({
   button: {
      margin: theme.spacing(1),
   },
}));

export interface IInventoryFormProps {
   inventoryForm: IInventoryForm;
   onSaveInventoryCallback: Function;
}

export interface IInventoryForm {
   name: string;
   description: string;
   allowNegativeStocks: boolean;
   status: EntityStatus;
}

export const EditInventoryForm: React.FC<IInventoryFormProps> =  ({inventoryForm, onSaveInventoryCallback}) => {
   const history = useHistory();
   const formClasses = useFormStyles();
   const buttonClasses = useButtonStyles();
   const { values, resetForm, getFieldProps, getFieldMeta, handleSubmit, errors, dirty, isValid } = useFormik<IInventoryForm>({
    initialValues: inventoryForm,
    validationSchema: Yup.object().shape({
       name: Yup.string().required('This filed is required')
    }),
    onSubmit: (values, bag) => {
       onSaveInventoryCallback(values, bag.resetForm);
    }
  });

   const name = getFieldProps("name");
   const nameField = getFieldMeta('name');

   const description = getFieldProps("description");
   // const descriptionField = getFieldMeta('description');

   const allowNegativeStocks = getFieldProps("allowNegativeStocks");

   const status = getFieldProps("status");
   const statusField = getFieldMeta('status');

  return (
    <Grid container>
       <form className={formClasses.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container wrap='nowrap'>
             <IconButton aria-label="go-back" size="small" className={buttonClasses.button} onClick={() => history.goBack()}>
                <ArrowBackIcon/>
             </IconButton>
             <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon/>}
                className={buttonClasses.button}
                disabled={!isValid || !dirty}
                type="submit"
             >
                Save
             </Button>
             <Button
                variant="contained"
                color="secondary"
                size='small'
                startIcon={<CancelIcon/>}
                className={buttonClasses.button}
                onClick={() => resetForm()}
                disabled={!dirty}
             >
                Reset
             </Button>
          </Grid>

          <Grid container>
             <Grid container  spacing={2}>
                <Grid item xs={8}>
                   <TextField  id="name" label="Name" style={{width: '100%'}} required error={nameField.touched && !!nameField.error} {...name}/>
                </Grid>
                <Grid item xs={4}>
                   <TextField  id="status" label="Status" style={{width: '100%'}} required error={statusField.touched && !!statusField.error} {...status}/>
                </Grid>
                <Grid item xs={12}>
                   <TextField  id="description" label="Description" style={{width: '100%'}} {...description}/>
                </Grid>
             </Grid>
          </Grid>
       </form>
    </Grid>
  );
};
