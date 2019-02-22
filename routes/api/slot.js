const express = require('express');
const router = express.Router();
const mogoose = require('mongoose');
const passport = require('passport');

// import model

const Slots = require('../../models/Slots');

router.post(
  '/book',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newSlot = new Slots({
      slot_time: req.body.slot_time,
      slot_date: req.body.slot_date,
      name: req.user.name,
      contact: req.user.contact,
      user: req.user.id
    });

    newSlot.save().then(slot => {
      res.json(slot);
    });
  }
);

router.get('/booked', (req, res) => {
  Slots.find()
    .sort({ date: -1 })
    .then(slot => res.json(slot))
    .catch(err =>
      res.status(404).json({ noBookingFound: 'No booking found ' })
    );
});

//@route GET api/slot/:post_id
//@desc get post by id
//@access public

// router.get('/:id', (req, res) => {
//   Slots.findById(req.params.id)
//     .then(slot => {
//       res.json(slot);
//     })
//     .catch(err => res.status(404).json({ noSlotFound: 'No slot foundss' }));
// });

//@route DELETE api/slot/:post_id
//@desc delete slot by id
//@access private

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Slots.findById(req.params.id)
      .then(slot => {
        // check slot owner, slot created owner can only do the delete option
        if (slot.user.toString() !== req.user.id) {
          return res.status(401).json({ unAuthorised: 'user not authorised' });
        }
        // delete the slot
        slot.remove().then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => res.status(404).json({ slotNotFound: 'Slot not found' }));
  }
);

// router.post(
//   '/fetch',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Slots.find({ slot_date: req.body.slot_date })
//       .then(slot => res.json(slot))
//       .catch(err => res.status(404).json({ slotNotFound: 'no slot found' }));
//   }
// );

router.post(
  '/bookedDates',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body.slot_date);
    Slots.find({ slot_date: req.body.slot_date })
      .then(slots => {
        res.json(slots);
      })
      .catch(err =>
        res.status(404).json({ slotNotFound: 'No slot available at this date' })
      );
  }
);

router.post(
  '/bookedSlotTime',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Slots.find({ slot_date: req.body.slot_date }).then(slots => {
      const defaultTime = [
        '1AM-2AM',
        '2AM-3AM',
        '3AM-4AM',
        '4AM-5AM',
        '5AM-6AM',
        '6AM-7AM',
        '7AM-8AM',
        '8AM-9AM'
      ];
      let reminedTime = [];
      let bookedTime = [];

      for (let key in slots) {
        bookedTime[key] = slots[key].slot_time;
      }

      reminedTime = defaultTime.filter(val => !bookedTime.includes(val));

      res.json(reminedTime);
    });
  }
);

module.exports = router;
