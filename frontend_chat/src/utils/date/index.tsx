import { format } from 'date-fns'

export const stdDate = (date:any, template:string = 'MM.dd.yyyy mm:ss a' ) => {
    return format(new Date(date), template)
}
