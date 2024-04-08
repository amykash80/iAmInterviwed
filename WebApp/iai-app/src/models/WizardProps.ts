import { ReactElement, ReactNode } from "react";
import PageMode from "./PageMode";
export default interface WizardProps<T> {
    mode: PageMode;
    data?: T; //This is applicable for Edit and View only
    onSubmit: (data: T) => void;
    children: ReactNode[];
    //appendToFormData?: (data: T, userDetails: TestConnectionUserData) => T;
    modelData?: T;
    //appendToUrl?: (data: T, testDetails: TestConnectionstreamData) => TestConnectionstreamData;
}