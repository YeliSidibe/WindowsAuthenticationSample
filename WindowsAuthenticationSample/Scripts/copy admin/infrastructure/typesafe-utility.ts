
export default class TypesafeUtil {
    static propertyOf = <TObj>(name: keyof TObj) => name;
}