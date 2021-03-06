import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {useFormik} from 'formik';
import * as Yup from "yup";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import {ICategory, IUnit} from "../../../../graphql/item.type";
import {useHistory} from "react-router";
import IconButton from "@material-ui/core/IconButton/IconButton";

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

const useButtonStyles = makeStyles(theme => ({
   button: {
      margin: theme.spacing(1),
   },
}));

export interface IItemFormProps {
   itemForm: IItemForm;
   units: IUnit[];
   categories: ICategory[];
   onSaveItemToolCallback: Function;
}

export interface IItemForm {
   code: string;
   defaultPrice: number;
   description: string;
   images: string[];
   manufacturer: string;
   model: string;
   name: string;
   notes: string;
   partNumber: string;
   status: string;
   unitId: number;
   categoryId: number;
}

export const EditSparePartsSuppliesItemForm: React.FC<IItemFormProps> =  ({itemForm, categories, units, onSaveItemToolCallback}) => {
   const history = useHistory();
   const formClasses = useFormStyles();
   const buttonClasses = useButtonStyles();
   const { values, resetForm, getFieldProps, getFieldMeta, handleSubmit, errors, dirty, isValid } = useFormik<IItemForm>({
    initialValues: itemForm,
    validationSchema: Yup.object().shape({
       name: Yup.string().required('This filed is required'),
       code: Yup.string().required('This filed is required'),
       defaultPrice: Yup.number(),
       categoryId: Yup.number().required()
    }),
    onSubmit: (values, bag) => {
       onSaveItemToolCallback(values, bag.resetForm);
    }
  });

   const name = getFieldProps("name");
   const nameField = getFieldMeta('name');

   const code = getFieldProps("code");
   const codeField = getFieldMeta('code');

   const description = getFieldProps("description");
   // const descriptionField = getFieldMeta('description');

   const manufacturer = getFieldProps("manufacturer");
   // const manufacturerField = getFieldMeta('manufacturer');

   // const model = getFieldProps("model");
   // const modelField = getFieldMeta('model');

   const partNumber = getFieldProps("partNumber");
   // const partNumberField = getFieldMeta('partNumber');


   const defaultPrice = getFieldProps("defaultPrice");
   // const defaultPriceField = getFieldMeta('defaultPrice');

   const unitId = getFieldProps("unitId");
   const unitIdField = getFieldMeta('unitId');

   const categoryId = getFieldProps("categoryId");
   const categoryIdField = getFieldMeta('categoryId');


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
                   <TextField  id="code" label="Code" style={{width: '100%'}} required error={codeField.touched && !!codeField.error} {...code}/>
                </Grid>
                <Grid item xs={12}>
                   <TextField  id="description" label="Description" style={{width: '100%'}} {...description}/>
                </Grid>
             </Grid>
          </Grid>

          <Grid container spacing={2}>
             <Grid item xs={4}><TextField  id="manufacturer" label="Manufacturer" {...manufacturer}/></Grid>
             <Grid item xs={4}><TextField  id="partNumber" label="Part Number" {...partNumber}/></Grid>
          </Grid>


          <Grid container spacing={2}>
             <Grid item xs={4}>
                <TextField  id="category" label="Category" select  style={{width: '100%'}} required error={categoryIdField.touched && !!categoryIdField.error} {...categoryId}>
                   <MenuItem key={-1} value="">--Select--</MenuItem>
                   {categories.map(c => (
                      <MenuItem key={c.categoryId} value={c.categoryId}>{c.name}</MenuItem>
                   ))}
                </TextField>
             </Grid>
             <Grid item xs={4}>
                <TextField  id="units" label="Units" select  style={{width: '100%'}} required error={unitIdField.touched && !!unitIdField.error} {...unitId}>
                   <MenuItem key={1} value="">--Select--</MenuItem>
                   {units.map(u => (
                      <MenuItem key={u.unitId} value={u.unitId}>{u.label}</MenuItem>
                   ))}
                </TextField>
             </Grid>
             <Grid item xs={4}>
                <TextField  id="default-price" label="Default Price" style={{width: '100%'}} {...defaultPrice}/>
             </Grid>
          </Grid>

       </form>
    </Grid>
  );
};
