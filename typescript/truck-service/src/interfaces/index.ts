export interface mapToDTO<T> {
    toDTO(deep: boolean): T
}

export interface createFromDTO<DTO, T> {
    createFromDTO(dto : DTO) : T
}

