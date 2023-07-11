interface IFieldCorrection {
  fieldName: string;
  showFieldCorrector: ComputedRef<boolean>,
  correctionFunction: (value: any) => any | undefined
}

export default IFieldCorrection;