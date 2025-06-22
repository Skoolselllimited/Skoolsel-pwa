"use client";

import CautionIcon from "../../../public/svgs/CautionIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";

type DeleteAdsModalProps = {
  showDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
};

const DeleteAdsModal = ({
  showDeleteModal,
  setShowDeleteModal,
}: DeleteAdsModalProps) => {
  return (
    <Dialog
      open={showDeleteModal}
      onOpenChange={() => setShowDeleteModal((prev) => !prev)}
    >
      <DialogContent
        aria-describedby="delete-draft-modal-contnet"
        // closeButtonClass="p-3 bg-panel rounded-[5px] top-6 right-3 sm:right-7 sm:top-7"
        className="max-w-[360px] rounded-md sm:max-w-xl py-6 px-3  sm:px-7 sm:py-7 "
      >
        <DialogHeader>
          <DialogDescription className="sr-only">Delete Ad</DialogDescription>
          <DialogTitle className=" text-left mt-3 block text-sm sm:hidden">
            Delete Ad
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col justify-center mt-3 sm:mt-14 w-full relative  items-center">
          <div className="w-[]">
            <CautionIcon />
          </div>
          <h2 className="font-secondary font-bold text-lg md:text-2xl mt-3 sm:mt-6">
            Hold on! Don&apos;t Delete Your Ad yet
          </h2>
          <p className="text-footer font-primary font-normal mt-3 sm:mt-5 text-center break-words w-full text-sm sm:text-base sm:w-5/6">
            By deleting your ad advert, it will be removed and it cannot be
            recovered{" "}
          </p>

          <div className="border-t-[1px] border-panel mt-4 sm:mt-8 pt-4 sm:pt-7 w-full">
            <Button
              onClick={() => setShowDeleteModal((prev) => !prev)}
              className="bg-[#FF3B30] rounded-[6px] text-white font-secondary font-bold text-sm sm:text-base py-5 sm:py-6  hover:bg-[#FF3B30] hover:opacity-70 w-full"
            >
              Delete Ad
            </Button>
          </div>
          <p className="w-full mt-4 font-tertiary text-xs sm:text-sm text-letter-3 text-center">
            Consider Editing Ads instead of deleting it.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAdsModal;
