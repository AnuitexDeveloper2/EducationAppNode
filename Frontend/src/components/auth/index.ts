export interface ApplicationState {
   
}

export interface AppAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}