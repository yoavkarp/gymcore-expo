import { ALL_UNITS } from "@/constants/units";
import { Parameter } from "@/graphql"

export function parameterToString(parameter: Parameter, title?: string): string {
    return `${title ? `${title}: ` : ""}${parameter.val ? parameter.val : ""}${parameter.max ? ` - ${parameter.max}` : ""}${parameter.unit ? ` ${ALL_UNITS.find((unit) => unit.value === parameter.unit)?.title}` : ""}`
}