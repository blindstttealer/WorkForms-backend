import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
export type SettingsModel = runtime.Types.Result.DefaultSelection<Prisma.$SettingsPayload>;
export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null;
    _min: SettingsMinAggregateOutputType | null;
    _max: SettingsMaxAggregateOutputType | null;
};
export type SettingsMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
};
export type SettingsMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
};
export type SettingsCountAggregateOutputType = {
    id: number;
    userId: number;
    data: number;
    _all: number;
};
export type SettingsMinAggregateInputType = {
    id?: true;
    userId?: true;
};
export type SettingsMaxAggregateInputType = {
    id?: true;
    userId?: true;
};
export type SettingsCountAggregateInputType = {
    id?: true;
    userId?: true;
    data?: true;
    _all?: true;
};
export type SettingsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SettingsWhereInput;
    orderBy?: Prisma.SettingsOrderByWithRelationInput | Prisma.SettingsOrderByWithRelationInput[];
    cursor?: Prisma.SettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SettingsCountAggregateInputType;
    _min?: SettingsMinAggregateInputType;
    _max?: SettingsMaxAggregateInputType;
};
export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
    [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSettings[P]> : Prisma.GetScalarType<T[P], AggregateSettings[P]>;
};
export type SettingsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SettingsWhereInput;
    orderBy?: Prisma.SettingsOrderByWithAggregationInput | Prisma.SettingsOrderByWithAggregationInput[];
    by: Prisma.SettingsScalarFieldEnum[] | Prisma.SettingsScalarFieldEnum;
    having?: Prisma.SettingsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SettingsCountAggregateInputType | true;
    _min?: SettingsMinAggregateInputType;
    _max?: SettingsMaxAggregateInputType;
};
export type SettingsGroupByOutputType = {
    id: string;
    userId: string;
    data: runtime.JsonValue | null;
    _count: SettingsCountAggregateOutputType | null;
    _min: SettingsMinAggregateOutputType | null;
    _max: SettingsMaxAggregateOutputType | null;
};
type GetSettingsGroupByPayload<T extends SettingsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SettingsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SettingsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SettingsGroupByOutputType[P]>;
}>>;
export type SettingsWhereInput = {
    AND?: Prisma.SettingsWhereInput | Prisma.SettingsWhereInput[];
    OR?: Prisma.SettingsWhereInput[];
    NOT?: Prisma.SettingsWhereInput | Prisma.SettingsWhereInput[];
    id?: Prisma.StringFilter<"Settings"> | string;
    userId?: Prisma.StringFilter<"Settings"> | string;
    data?: Prisma.JsonNullableFilter<"Settings">;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type SettingsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    data?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type SettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.SettingsWhereInput | Prisma.SettingsWhereInput[];
    OR?: Prisma.SettingsWhereInput[];
    NOT?: Prisma.SettingsWhereInput | Prisma.SettingsWhereInput[];
    data?: Prisma.JsonNullableFilter<"Settings">;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type SettingsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    data?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.SettingsCountOrderByAggregateInput;
    _max?: Prisma.SettingsMaxOrderByAggregateInput;
    _min?: Prisma.SettingsMinOrderByAggregateInput;
};
export type SettingsScalarWhereWithAggregatesInput = {
    AND?: Prisma.SettingsScalarWhereWithAggregatesInput | Prisma.SettingsScalarWhereWithAggregatesInput[];
    OR?: Prisma.SettingsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SettingsScalarWhereWithAggregatesInput | Prisma.SettingsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Settings"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Settings"> | string;
    data?: Prisma.JsonNullableWithAggregatesFilter<"Settings">;
};
export type SettingsCreateInput = {
    id?: string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    user: Prisma.UserCreateNestedOneWithoutSettingsInput;
};
export type SettingsUncheckedCreateInput = {
    id?: string;
    userId: string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type SettingsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    user?: Prisma.UserUpdateOneRequiredWithoutSettingsNestedInput;
};
export type SettingsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type SettingsCreateManyInput = {
    id?: string;
    userId: string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type SettingsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type SettingsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type SettingsNullableScalarRelationFilter = {
    is?: Prisma.SettingsWhereInput | null;
    isNot?: Prisma.SettingsWhereInput | null;
};
export type SettingsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    data?: Prisma.SortOrder;
};
export type SettingsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type SettingsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type SettingsCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SettingsCreateWithoutUserInput, Prisma.SettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.SettingsCreateOrConnectWithoutUserInput;
    connect?: Prisma.SettingsWhereUniqueInput;
};
export type SettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SettingsCreateWithoutUserInput, Prisma.SettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.SettingsCreateOrConnectWithoutUserInput;
    connect?: Prisma.SettingsWhereUniqueInput;
};
export type SettingsUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SettingsCreateWithoutUserInput, Prisma.SettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.SettingsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.SettingsUpsertWithoutUserInput;
    disconnect?: Prisma.SettingsWhereInput | boolean;
    delete?: Prisma.SettingsWhereInput | boolean;
    connect?: Prisma.SettingsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SettingsUpdateToOneWithWhereWithoutUserInput, Prisma.SettingsUpdateWithoutUserInput>, Prisma.SettingsUncheckedUpdateWithoutUserInput>;
};
export type SettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SettingsCreateWithoutUserInput, Prisma.SettingsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.SettingsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.SettingsUpsertWithoutUserInput;
    disconnect?: Prisma.SettingsWhereInput | boolean;
    delete?: Prisma.SettingsWhereInput | boolean;
    connect?: Prisma.SettingsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SettingsUpdateToOneWithWhereWithoutUserInput, Prisma.SettingsUpdateWithoutUserInput>, Prisma.SettingsUncheckedUpdateWithoutUserInput>;
};
export type SettingsCreateWithoutUserInput = {
    id?: string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type SettingsUncheckedCreateWithoutUserInput = {
    id?: string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type SettingsCreateOrConnectWithoutUserInput = {
    where: Prisma.SettingsWhereUniqueInput;
    create: Prisma.XOR<Prisma.SettingsCreateWithoutUserInput, Prisma.SettingsUncheckedCreateWithoutUserInput>;
};
export type SettingsUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.SettingsUpdateWithoutUserInput, Prisma.SettingsUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SettingsCreateWithoutUserInput, Prisma.SettingsUncheckedCreateWithoutUserInput>;
    where?: Prisma.SettingsWhereInput;
};
export type SettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.SettingsWhereInput;
    data: Prisma.XOR<Prisma.SettingsUpdateWithoutUserInput, Prisma.SettingsUncheckedUpdateWithoutUserInput>;
};
export type SettingsUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type SettingsUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type SettingsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    data?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["settings"]>;
export type SettingsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    data?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["settings"]>;
export type SettingsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    data?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["settings"]>;
export type SettingsSelectScalar = {
    id?: boolean;
    userId?: boolean;
    data?: boolean;
};
export type SettingsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "data", ExtArgs["result"]["settings"]>;
export type SettingsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SettingsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SettingsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $SettingsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Settings";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        data: runtime.JsonValue | null;
    }, ExtArgs["result"]["settings"]>;
    composites: {};
};
export type SettingsGetPayload<S extends boolean | null | undefined | SettingsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SettingsPayload, S>;
export type SettingsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SettingsCountAggregateInputType | true;
};
export interface SettingsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Settings'];
        meta: {
            name: 'Settings';
        };
    };
    findUnique<T extends SettingsFindUniqueArgs>(args: Prisma.SelectSubset<T, SettingsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SettingsClient<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SettingsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SettingsClient<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SettingsFindFirstArgs>(args?: Prisma.SelectSubset<T, SettingsFindFirstArgs<ExtArgs>>): Prisma.Prisma__SettingsClient<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SettingsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SettingsClient<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SettingsFindManyArgs>(args?: Prisma.SelectSubset<T, SettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SettingsCreateArgs>(args: Prisma.SelectSubset<T, SettingsCreateArgs<ExtArgs>>): Prisma.Prisma__SettingsClient<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SettingsCreateManyArgs>(args?: Prisma.SelectSubset<T, SettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SettingsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SettingsDeleteArgs>(args: Prisma.SelectSubset<T, SettingsDeleteArgs<ExtArgs>>): Prisma.Prisma__SettingsClient<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SettingsUpdateArgs>(args: Prisma.SelectSubset<T, SettingsUpdateArgs<ExtArgs>>): Prisma.Prisma__SettingsClient<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SettingsDeleteManyArgs>(args?: Prisma.SelectSubset<T, SettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SettingsUpdateManyArgs>(args: Prisma.SelectSubset<T, SettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SettingsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SettingsUpsertArgs>(args: Prisma.SelectSubset<T, SettingsUpsertArgs<ExtArgs>>): Prisma.Prisma__SettingsClient<runtime.Types.Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SettingsCountArgs>(args?: Prisma.Subset<T, SettingsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SettingsCountAggregateOutputType> : number>;
    aggregate<T extends SettingsAggregateArgs>(args: Prisma.Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>;
    groupBy<T extends SettingsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SettingsGroupByArgs['orderBy'];
    } : {
        orderBy?: SettingsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SettingsFieldRefs;
}
export interface Prisma__SettingsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SettingsFieldRefs {
    readonly id: Prisma.FieldRef<"Settings", 'String'>;
    readonly userId: Prisma.FieldRef<"Settings", 'String'>;
    readonly data: Prisma.FieldRef<"Settings", 'Json'>;
}
export type SettingsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
    where: Prisma.SettingsWhereUniqueInput;
};
export type SettingsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
    where: Prisma.SettingsWhereUniqueInput;
};
export type SettingsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
    where?: Prisma.SettingsWhereInput;
    orderBy?: Prisma.SettingsOrderByWithRelationInput | Prisma.SettingsOrderByWithRelationInput[];
    cursor?: Prisma.SettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SettingsScalarFieldEnum | Prisma.SettingsScalarFieldEnum[];
};
export type SettingsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
    where?: Prisma.SettingsWhereInput;
    orderBy?: Prisma.SettingsOrderByWithRelationInput | Prisma.SettingsOrderByWithRelationInput[];
    cursor?: Prisma.SettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SettingsScalarFieldEnum | Prisma.SettingsScalarFieldEnum[];
};
export type SettingsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
    where?: Prisma.SettingsWhereInput;
    orderBy?: Prisma.SettingsOrderByWithRelationInput | Prisma.SettingsOrderByWithRelationInput[];
    cursor?: Prisma.SettingsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SettingsScalarFieldEnum | Prisma.SettingsScalarFieldEnum[];
};
export type SettingsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SettingsCreateInput, Prisma.SettingsUncheckedCreateInput>;
};
export type SettingsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SettingsCreateManyInput | Prisma.SettingsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SettingsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    data: Prisma.SettingsCreateManyInput | Prisma.SettingsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SettingsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SettingsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SettingsUpdateInput, Prisma.SettingsUncheckedUpdateInput>;
    where: Prisma.SettingsWhereUniqueInput;
};
export type SettingsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SettingsUpdateManyMutationInput, Prisma.SettingsUncheckedUpdateManyInput>;
    where?: Prisma.SettingsWhereInput;
    limit?: number;
};
export type SettingsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SettingsUpdateManyMutationInput, Prisma.SettingsUncheckedUpdateManyInput>;
    where?: Prisma.SettingsWhereInput;
    limit?: number;
    include?: Prisma.SettingsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SettingsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
    where: Prisma.SettingsWhereUniqueInput;
    create: Prisma.XOR<Prisma.SettingsCreateInput, Prisma.SettingsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SettingsUpdateInput, Prisma.SettingsUncheckedUpdateInput>;
};
export type SettingsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
    where: Prisma.SettingsWhereUniqueInput;
};
export type SettingsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SettingsWhereInput;
    limit?: number;
};
export type SettingsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SettingsSelect<ExtArgs> | null;
    omit?: Prisma.SettingsOmit<ExtArgs> | null;
    include?: Prisma.SettingsInclude<ExtArgs> | null;
};
export {};
