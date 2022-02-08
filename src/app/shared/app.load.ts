import { AppLoadService } from '@core/services/app-load.service';


export function appLoad(appLoadService: AppLoadService): () => void {
    return (): void => {
        appLoadService.getUserDetails();
        appLoadService.getClientDetails();
    };
}
